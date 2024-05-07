/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package springapp.web.controller;

import java.util.List;
import javax.servlet.http.HttpServletRequest;
import org.hibernate.Session;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;
import springapp.web.dao.UserDao;
import springapp.web.model.Employee;
import springapp.web.model.HibernateUtil;
import springapp.web.model.Users;

/**
 *
 * @author KunPC
 */
@Controller
@RequestMapping(value = "/admin")
public class EmployeeController {

    private final UserDao dao = new UserDao();

    @RequestMapping(value = {"/employee/list"}, method = RequestMethod.GET)
    public String listUsers(ModelMap model, HttpServletRequest request) {
        Users user = (Users) request.getSession().getAttribute("LOGGEDIN_USER");
        String value = "";
        if (user != null) {
            try {
                Session session = HibernateUtil.getSessionFactory().getCurrentSession();
                session.beginTransaction();
                List listEmployees = session.createQuery("from Employee").list();
                model.addAttribute("listEmployees", listEmployees);
                session.getTransaction().commit();
                value = "admin/listEmployee";
            } catch (Exception e) {
                value = "admin/listEmployee";
            }

        } else {
            model.addAttribute("user", new Users());
            value = "redirect:/admin/login.html";
        }
        return value;
    }

    @RequestMapping(value = "/employee/add.html ", method = RequestMethod.GET)
    public String showAddEmployeeForm(ModelMap model) {
        model.addAttribute("employee", new Employee());
        return "admin/addEmployee";
    }

    @RequestMapping(value = "/employee/add.html", method = RequestMethod.POST)
    public String addEmployee(@ModelAttribute("employee") Employee employee, RedirectAttributes redirectAttributes) {
        try {
            Session session = HibernateUtil.getSessionFactory().getCurrentSession();
            session.beginTransaction();

            session.save(employee);
            session.getTransaction().commit();

             redirectAttributes.addFlashAttribute("successMessage", "Employee added successfully!");

            return "redirect:/admin/employee/list.html"; // Chuyển hướng đến trang danh sách nhân viên
        } catch (Exception e) {
            e.printStackTrace();
            // Xử lý lỗi ở đây nếu cần
            return "admin/addEmployee"; // Trả về trang thêm nhân viên nếu có lỗi xảy ra
        }
    }

    @RequestMapping(value = "/employee/edit.html", method = RequestMethod.POST)
    public String editEmployee(@ModelAttribute("employee") Employee employee, @RequestParam("employeeNumber") int employeeNumber, ModelMap model, HttpServletRequest request) {
        Users userSession = (Users) request.getSession().getAttribute("LOGGEDIN_USER");
        if (userSession != null) {
            try {
                Session session = HibernateUtil.getSessionFactory().getCurrentSession();
                session.beginTransaction();

                // Lấy thông tin của nhân viên cần chỉnh sửa từ cơ sở dữ liệu
                Employee existingEmployee = (Employee) session.get(Employee.class, employeeNumber);
                if (existingEmployee != null) {
                    // Cập nhật thông tin của nhân viên từ dữ liệu gửi từ form chỉnh sửa
                    existingEmployee.setLastName(employee.getLastName());
                    existingEmployee.setFirstName(employee.getFirstName());
                    existingEmployee.setSsn(employee.getSsn());
                    existingEmployee.setPayRate(employee.getPayRate());
                    existingEmployee.setPayRatesId(employee.getPayRatesId());
                    existingEmployee.setVacationDays(employee.getVacationDays());
                    existingEmployee.setPaidToDate(employee.getPaidToDate());
                    existingEmployee.setPaidLastYear(employee.getPaidLastYear());
                    model.addAttribute("successMessage", "Employee edited successfully");
                    session.update(existingEmployee);
                    session.getTransaction().commit();

                    model.addAttribute("successMessage", "Employee edited successfully");
                    // Chuyển hướng đến trang danh sách nhân viên sau khi chỉnh sửa thành công
                    return "admin/editEmployee";
                } else {
                    // Nếu không tìm thấy nhân viên, thông báo lỗi
                    model.addAttribute("errorMessage", "Employee not found");
                    return "admin/editEmployee";
                }
            } catch (Exception e) {
                // Xử lý lỗi nếu có
                e.printStackTrace();
                model.addAttribute("errorMessage", "Error occurred while editing employee");
                return "redirect:/admin/employee/list.html";
            }
        } else {
            // Nếu không có người dùng đăng nhập, chuyển hướng đến trang đăng nhập
            return "redirect:/admin/login.html";
        }
    }

    @RequestMapping(value = "/employee/edit", method = RequestMethod.GET)
    public String editEmployeeForm(@RequestParam("employeeNumber") int employeeNumber, ModelMap model, HttpServletRequest request) {
        Users userSession = (Users) request.getSession().getAttribute("LOGGEDIN_USER");
        if (userSession != null) {
            try {
                Session session = HibernateUtil.getSessionFactory().getCurrentSession();
                session.beginTransaction();

                // Lấy thông tin của nhân viên cần chỉnh sửa từ cơ sở dữ liệu
                Employee employee = (Employee) session.get(Employee.class, employeeNumber);
                if (employee != null) {
                    model.addAttribute("successMessage", "Employee information loaded successfully.");
                    // Nếu nhân viên tồn tại, hiển thị form chỉnh sửa thông tin của nhân viên
                    model.addAttribute("employee", employee);
                    return "admin/editEmployee";
                } else {
                    // Nếu không tìm thấy nhân viên, hiển thị thông báo lỗi
                    model.addAttribute("errorMessage", "Employee not found");
                    return "admin/editEmployee";
                }
            } catch (NumberFormatException e) {
                // Xử lý nếu id không hợp lệ
                model.addAttribute("errorMessage", "Invalid employee id");
                return "admin/editEmployee";
            } catch (Exception e) {
                // Xử lý lỗi nếu có
                e.printStackTrace();
                model.addAttribute("errorMessage", "Error occurred while getting employee information");
                return "admin/editEmployee";
            }
        } else {
            // Nếu không có người dùng đăng nhập, chuyển hướng đến trang đăng nhập
            return "redirect:/admin/login.html";
        }
    }

    @RequestMapping(value = "/employee/delete", method = RequestMethod.GET)
    public String deleteEmployeeForm(@RequestParam("employeeNumber") int employeeNumber, ModelMap model, HttpServletRequest request) {
        Users userSession = (Users) request.getSession().getAttribute("LOGGEDIN_USER");
        if (userSession != null) {
            try {
                Session session = HibernateUtil.getSessionFactory().getCurrentSession();
                session.beginTransaction();

                // Lấy thông tin của nhân viên cần chỉnh sửa từ cơ sở dữ liệu
                Employee employee = (Employee) session.get(Employee.class, employeeNumber);
                if (employee != null) {
                    // Nếu nhân viên tồn tại, hiển thị form chỉnh sửa thông tin của nhân viên
                    model.addAttribute("employee", employee);
                    return "admin/deleteEmployee";
                } else {
                    // Nếu không tìm thấy nhân viên, hiển thị thông báo lỗi
                    model.addAttribute("errorMessage", "Employee not found");
                    return "admin/deleteEmployee";
                }
            } catch (NumberFormatException e) {
                // Xử lý nếu id không hợp lệ
                model.addAttribute("errorMessage", "Invalid employee id");
                return "admin/deleteEmployee";
            } catch (Exception e) {
                // Xử lý lỗi nếu có
                e.printStackTrace();
                model.addAttribute("errorMessage", "Error occurred while getting employee information");
                return "admin/deleteEmployee";
            }
        } else {
            // Nếu không có người dùng đăng nhập, chuyển hướng đến trang đăng nhập
            return "redirect:/admin/login.html";
        }
    }

    @RequestMapping(value = "/employee/delete.html", method = RequestMethod.POST)
    public String deleteEmployee(@ModelAttribute("employee") Employee employee, @RequestParam("employeeNumber") int employeeNumber, ModelMap model, HttpServletRequest request) {
        Users userSession = (Users) request.getSession().getAttribute("LOGGEDIN_USER");
        if (userSession != null) {
            try {
                Session session = HibernateUtil.getSessionFactory().getCurrentSession();
                session.beginTransaction();

                // Lấy thông tin của nhân viên cần chỉnh sửa từ cơ sở dữ liệu
                Employee existingEmployee = (Employee) session.get(Employee.class, employeeNumber);
                if (existingEmployee != null) {
                    // Xóa nhân viên khỏi cơ sở dữ liệu
                    session.delete(existingEmployee);
                    session.getTransaction().commit();
                    model.addAttribute("successMessage", "Employee deleted successfully");
                    // Chuyển hướng đến trang danh sách nhân viên sau khi xóa thành công
//                return "redirect:/admin/listEmployee";
                    // Chuyển hướng đến trang danh sách nhân viên sau khi chỉnh sửa thành công
                    return "admin/deleteEmployee";
                } else {
                    // Nếu không tìm thấy nhân viên, thông báo lỗi
                    model.addAttribute("errorMessage", "Employee not found");
                    return "admin/deleteEmployee";
                }
            } catch (Exception e) {
                // Xử lý lỗi nếu có
                e.printStackTrace();
                model.addAttribute("errorMessage", "Error occurred while editing employee");
                return "admin/listEmployee";
            }
        } else {
            // Nếu không có người dùng đăng nhập, chuyển hướng đến trang đăng nhập
            return "redirect:/admin/login.html";
        }
    }

}

//@Controller
//@RequestMapping(value = "/admin")
//public class EmployeeController {
//    @RequestMapping(value = "/employee/list", method = RequestMethod.GET)
//    public String listEmployee(ModelMap model, HttpServletRequest request) {
//        Users user = (Users) request.getSession().getAttribute("LOGGEDIN_USER");
//        String value = "";
//        if (user != null) {
//            try {
//                Session session = HibernateUtil.getSessionFactory().getCurrentSession();
//                session.beginTransaction();
//                List listEmployees = session.createQuery("from Employee").list();
//                model.addAttribute("listEmployees", listEmployees);
//                session.getTransaction().commit();
//                value = "admin/listEmployee";
//            } catch (Exception e) {
//            }
//
//        } else {
//            model.addAttribute("user", new Users());
//            value= "redirect:/admin/login.html";
//        }
//        return value;
//    }
//}
