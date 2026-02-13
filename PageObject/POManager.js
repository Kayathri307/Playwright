import { LoginPage } from '../PageObject/LoginPage.js';
import { DashboardPage } from '../PageObject/DashboardPage.js';
import { CartPage } from '../PageObject/CartPages.js';
import { OrderDetailPages } from '../PageObject/OrderDetailpages.js';
import { OrderConfirmationPage } from '../PageObject/OrderConfirmPage.js';
import { OrdersPage } from '../PageObject/Orderpage.js';

export class POManager {
    constructor(page) {
        this.page = page;
        this.loginPage = new LoginPage(this.page);
        this.dashboardPage = new DashboardPage(this.page);
        this.cartPage = new CartPage(this.page);
        this.orderDetailPage = new OrderDetailPages(this.page);
        this.orderConfirmationPage = new OrderConfirmationPage(this.page);
        this.ordersPage = new OrdersPage(this.page);
    }

    getLoginPage() {
        return this.loginPage;
    }

    getDashboardPage() {
        return this.dashboardPage;
    }

    getCartPage() {
        return this.cartPage;
    }

    getOrderDetailPage() {
        return this.orderDetailPage;
    }

    getOrderConfirmationPage() {
        return this.orderConfirmationPage;
    }

    getOrdersPage() {
        return this.ordersPage;
    }
}