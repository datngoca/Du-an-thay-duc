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
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import springapp.web.model.PayRates;
import springapp.web.model.HibernateUtil;
import springapp.web.model.Users;

/**
 *
 * @author AnhDao
 */
@Controller
@RequestMapping(value = "/admin")
public class PayRateController {
    
    @RequestMapping(value = {"/payrates/list"}, method = RequestMethod.GET)
    public String listUsers(ModelMap model, HttpServletRequest request) {
        Users user = (Users) request.getSession().getAttribute("LOGGEDIN_USER");
        String value = "";
        if (user != null) {
            try {
                Session session = HibernateUtil.getSessionFactory().getCurrentSession();
                session.beginTransaction();
                List listPayRates = session.createQuery("from PayRates").list();
                model.addAttribute("listPayRates", listPayRates);
                session.getTransaction().commit();
                value = "admin/listPayRate";
            } catch (Exception e) {
                value = "admin/listPayRate";
            }

        } else {
            model.addAttribute("user", new Users());
            value= "redirect:/admin/login.html";
        }
        return value;
    }
        @RequestMapping(value = "/payrates/add", method = RequestMethod.GET)
public String showAddPayRateForm(ModelMap model) {
    model.addAttribute("payrate", new PayRates());
    return "admin/addPayRate";
}

@RequestMapping(value = "/payrates/add", method = RequestMethod.POST)
public String addPayRate(@ModelAttribute("payrate") PayRates payrate, ModelMap model) {
    try {
        Session session = HibernateUtil.getSessionFactory().getCurrentSession();
        session.beginTransaction();
        
        session.save(payrate);
        session.getTransaction().commit();

        model.addAttribute("successMessage", "PayRates added successfully!");

        return "admin/listPayRate"; // Hiển thị lại trang addEmployee để xem thông báo
    } catch (Exception e) {
        e.printStackTrace();
        return "admin/listPayRate"; // Trả về trang lỗi nếu có lỗi xảy ra
    }
}
@RequestMapping(value = "/payrates/edit.html", method = RequestMethod.POST)
public String editPayRate(@ModelAttribute("payrate") PayRates payrate, @RequestParam("idPayRates") int idPayRates, ModelMap model, HttpServletRequest request) {
    Users userSession = (Users) request.getSession().getAttribute("LOGGEDIN_USER");
    if (userSession != null) {
        try {
            Session session = HibernateUtil.getSessionFactory().getCurrentSession();
            session.beginTransaction();

            // Lấy thông tin của nhân viên cần chỉnh sửa từ cơ sở dữ liệu
            PayRates existingPayrate = (PayRates) session.get(PayRates.class, idPayRates);
            if (existingPayrate != null) {
//                 Cập nhật thông tin của nhân viên từ dữ liệu gửi từ form chỉnh sửa
                existingPayrate.setPayRateName(payrate.getPayRateName());
                existingPayrate.setPayAmount(payrate.getPayAmount());
                existingPayrate.setPayType(payrate.getPayType());
                existingPayrate.setPtLevelC(payrate.getPtLevelC());
                 existingPayrate.setTaxPercentage(payrate.getTaxPercentage());
                existingPayrate.setValue(payrate.getValue());
               

                session.update(existingPayrate);
                session.getTransaction().commit();

                // Chuyển hướng đến trang danh sách nhân viên sau khi chỉnh sửa thành công
                return "admin/listEmployee";
            } else {
                // Nếu không tìm thấy nhân viên, thông báo lỗi
                model.addAttribute("errorMessage", "Employee not found");
                return "admin/listPayRate";
            }
        } catch (Exception e) {
            // Xử lý lỗi nếu có
            e.printStackTrace();
            model.addAttribute("errorMessage", "Error occurred while editing employee");
            return "admin/listPayRate";
        }
    } else {
        // Nếu không có người dùng đăng nhập, chuyển hướng đến trang đăng nhập
        return "redirect:/admin/login.html";
    }
}


@RequestMapping(value = "/payrates/edit", method = RequestMethod.GET)
public String editPayRateFrom(@RequestParam("idPayRates") int idPayRates, ModelMap model, HttpServletRequest request) {
    Users userSession = (Users) request.getSession().getAttribute("LOGGEDIN_USER");
    if (userSession != null) {
        try {
            Session session = HibernateUtil.getSessionFactory().getCurrentSession();
            session.beginTransaction();

            // Lấy thông tin của nhân viên cần chỉnh sửa từ cơ sở dữ liệu
            PayRates existingPayrate = (PayRates) session.get(PayRates.class, idPayRates);
            if (existingPayrate != null) {
                // Nếu nhân viên tồn tại, hiển thị form chỉnh sửa thông tin của nhân viên
                model.addAttribute("payrate", existingPayrate);
                return "admin/editPayRate";
            } else {
                // Nếu không tìm thấy nhân viên, hiển thị thông báo lỗi
                model.addAttribute("errorMessage", "Employee not found");
                return "admin/listPayRate";
            }
        } catch (NumberFormatException e) {
            // Xử lý nếu id không hợp lệ
            model.addAttribute("errorMessage", "Invalid employee id");
            return "admin/listPayRate";
        } catch (Exception e) {
            // Xử lý lỗi nếu có
            e.printStackTrace();
            model.addAttribute("errorMessage", "Error occurred while getting employee information");
            return "admin/listPayRate";
        }
    } else {
        // Nếu không có người dùng đăng nhập, chuyển hướng đến trang đăng nhập
        return "redirect:/admin/login.html";
    }
}

@RequestMapping(value = "/payrates/delete", method = RequestMethod.GET)
public String deletePayRateFrom(@RequestParam("idPayRates") int idPayRates, ModelMap model, HttpServletRequest request) {
    Users userSession = (Users) request.getSession().getAttribute("LOGGEDIN_USER");
    if (userSession != null) {
        try {
            Session session = HibernateUtil.getSessionFactory().getCurrentSession();
            session.beginTransaction();

            // Lấy thông tin của nhân viên cần chỉnh sửa từ cơ sở dữ liệu
            PayRates existingPayrate = (PayRates) session.get(PayRates.class, idPayRates);
            if (existingPayrate != null) {
                // Nếu nhân viên tồn tại, hiển thị form chỉnh sửa thông tin của nhân viên
                model.addAttribute("payrate", existingPayrate);
                return "admin/deletePayRate";
            } else {
                // Nếu không tìm thấy nhân viên, hiển thị thông báo lỗi
                model.addAttribute("errorMessage", "Employee not found");
                return "admin/listPayRate";
            }
        } catch (NumberFormatException e) {
            // Xử lý nếu id không hợp lệ
            model.addAttribute("errorMessage", "Invalid employee id");
            return "admin/listPayRate";
        } catch (Exception e) {
            // Xử lý lỗi nếu có
            e.printStackTrace();
            model.addAttribute("errorMessage", "Error occurred while getting employee information");
            return "admin/listPayRate";
        }
    } else {
        // Nếu không có người dùng đăng nhập, chuyển hướng đến trang đăng nhập
        return "redirect:/admin/login.html";
    }
}


@RequestMapping(value = "/payrates/delete.html", method = RequestMethod.POST)
public String deletetPayRate(@ModelAttribute("payrates") PayRates payrate, @RequestParam("idPayRates") int idPayRates, ModelMap model, HttpServletRequest request) {
    Users userSession = (Users) request.getSession().getAttribute("LOGGEDIN_USER");
    if (userSession != null) {
        try {
            Session session = HibernateUtil.getSessionFactory().getCurrentSession();
            session.beginTransaction();

            // Lấy thông tin của nhân viên cần chỉnh sửa từ cơ sở dữ liệu
            PayRates existingPayrate = (PayRates) session.get(PayRates.class, idPayRates);
            if (existingPayrate != null) {
                // Xóa nhân viên khỏi cơ sở dữ liệu
                session.delete(existingPayrate);
                session.getTransaction().commit();

                // Chuyển hướng đến trang danh sách nhân viên sau khi xóa thành công
//                return "redirect:/admin/listEmployee";

                // Chuyển hướng đến trang danh sách nhân viên sau khi chỉnh sửa thành công
                return "admin/listEmployee";
            } else {
                // Nếu không tìm thấy nhân viên, thông báo lỗi
                model.addAttribute("errorMessage", "Employee not found");
                return "admin/listEmployee";
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
