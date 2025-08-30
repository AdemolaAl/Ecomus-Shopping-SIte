import Header from "../dashboardComponents/header";
import Headtext from "../dashboardComponents/headtext";
import { GreyFooter } from "../components/footer";
import "../dashboard.scss"

export default function () {
    return(
        <div>
            <Header />
            <Headtext text="My account" />
            <div className="dashboard-main">
                <div className="dash-cover">
                    <div className="navigation">
                        <div>Dashboard</div>
                        <div>Orders</div>
                        <div>Downloads</div>
                        <div>Addresses</div>
                        <div>Account details</div>
                        <div>Log out</div>
                    </div>
                    <div className="content">
                        <div className="dashboard">
                            
                        </div>
                    </div>
                </div>
            </div>
            <GreyFooter />
        </div>
    )
}