'use client'
import Header from "../dashboardComponents/header";
import Headtext from "../dashboardComponents/headtext";
import { GreyFooter } from "../components/footer";
import "../dashboard.scss"
import { useState } from "react";
import useSWR from 'swr'

import { useGlobalState } from "../components/default2";

const fetcher = (...args) => fetch(...args).then((res) => res.json())


export default function () {
    const { state, dispatch } = useGlobalState();
    const openLoading = () => dispatch({ type: 'OPEN_LOADING' });
    const closeLoading = () => dispatch({type:'CLOSE_LOADING'})

    const { data, error } = useSWR('/api/user', fetcher)





    const [activeTab, setActiveTab] = useState("dashboard")
    const [activeAddress, setActiveAddress] = useState("")

    const openTab = (data) => {
        setActiveAddress('')
        setActiveTab(data)

    }
    const openAddress = (data) => {
        setActiveAddress(data)

    }


    const Tab = ({ name, activeTab, openTab, children }) => (
        <div onClick={() => openTab(name)} style={{ borderLeft: activeTab == name ? '2px solid black' : '' }}>{children}</div>
    )



     if (error) return <div>Failed to load</div>
    if (!data) return 

    console.log(data)
    const user = data.data




    return (
        <div>
            
            <Header />
            <Headtext text="My account" />
            <div className="dashboard-main">
                <div className="dash-cover">
                    <div className="navigation">
                        <Tab name="dashboard" activeTab={activeTab} openTab={openTab}>Dashboard</Tab>
                        <Tab name="orders" activeTab={activeTab} openTab={openTab}>Orders</Tab>
                        <Tab name="addresses" activeTab={activeTab} openTab={openTab}>Addresses</Tab>
                        <Tab name="account" activeTab={activeTab} openTab={openTab}>Account details</Tab>
                        <Tab name="logout" activeTab={activeTab} openTab={openTab}><a href="/logout">Log out</a></Tab>
                    </div>

                    <div className="content">
                        {
                            activeTab == 'dashboard' ?
                                <div className="dashboard">
                                    Hello <p className="username"> {user.username} </p> <br />
                                    From your account dashboard you can view your <a href=""> recent orders</a>, manage your <a href=""> shipping and billing addresses</a>, and edit your <a href="">password and account details</a>.
                                </div>

                                : activeTab == 'orders' ?
                                    <div className="orders">
                                        {/* You don't have any orders yet. */}
                                        <div className="orders-details">
                                            <div className="rowhead row">
                                                <div>Order</div>
                                                <div>Date</div>
                                                <div>Status</div>
                                                <div>Total</div>
                                                <div>Actions</div>
                                            </div>

                                            <div className="row">
                                                <div>#6924</div>
                                                <div>September 1, 2025</div>
                                                <div>On hold</div>
                                                <div>$28.00 for 1 item</div>
                                                <div><a href="">View</a></div>
                                            </div>

                                        </div>
                                    </div>


                                    : (activeTab == 'addresses' && activeAddress == '') ?
                                        <div className="addresses">
                                            <p>The following addresses will be used on the checkout page by default.</p>


                                            <div>
                                                <header>
                                                    <h2>Billing address</h2>
                                                    <p className="edit" onClick={() => openAddress('billing-address')}>
                                                        Edit Billing address
                                                    </p>
                                                </header>
                                                <address>
                                                    Ademola Al-ameen<br />
                                                    caleb<br />
                                                    37 Alh.baruwa street<br />
                                                    Agboju<br />
                                                    Lagos<br />
                                                    Lagos<br />
                                                    102101<br />
                                                    Nigeria
                                                </address>
                                            </div>

                                            <div>
                                                <header>
                                                    <h2>Shipping address</h2>
                                                    <p className="edit" onClick={() => openAddress('shipping-address')}>
                                                        Edit Shipping address
                                                    </p>
                                                </header>
                                                <address>
                                                    Ademola Al-ameen<br />
                                                    caleb<br />
                                                    37 Alh.baruwa street<br />
                                                    Agboju<br />
                                                    Lagos<br />
                                                    Lagos<br />
                                                    102101<br />
                                                    Nigeria
                                                </address>
                                            </div>

                                        </div>

                                        : activeAddress == 'billing-address' ?
                                            <div className="billing-address">
                                                <h2>Billing Address</h2>
                                                <form>
                                                    <div className="names">
                                                        <label>
                                                            First name * <br />
                                                            <input type="text" placeholder="First name *" />
                                                        </label>

                                                        <label>
                                                            Last name * <br />
                                                            <input type="text" placeholder="Last name *" />
                                                        </label>


                                                    </div>

                                                    <label>
                                                        Company name (optional)<br />
                                                        <input type="text" name="company" />
                                                    </label>
                                                    <br />

                                                    <label>
                                                        Country / Region *
                                                        <input type="text" name="country" required />
                                                    </label>
                                                    <br />

                                                    <label>
                                                        Street address *
                                                        <input type="text" name="street" required />
                                                    </label>
                                                    <br />

                                                    <label>
                                                        Town / City *
                                                        <input type="text" name="city" required />
                                                    </label>
                                                    <br />

                                                    <label>
                                                        State *
                                                        <input type="text" name="state" required />
                                                    </label>
                                                    <br />

                                                    <label>
                                                        Phone *
                                                        <input type="tel" name="phone" required />
                                                    </label>
                                                    <br />

                                                    <label>
                                                        Email address *
                                                        <input type="email" name="email" required />
                                                    </label>
                                                    <br />

                                                    <button type="submit">Save address</button>
                                                </form>
                                            </div>

                                            : activeAddress == 'shipping-address' ?
                                                <div className="billing-address">
                                                    <h2>Shipping Address</h2>
                                                    <form>
                                                        <div className="names">
                                                            <label>
                                                                First name * <br />
                                                                <input type="text" placeholder="First name *" />
                                                            </label>

                                                            <label>
                                                                Last name * <br />
                                                                <input type="text" placeholder="Last name *" />
                                                            </label>


                                                        </div>

                                                        <label>
                                                            Company name (optional)<br />
                                                            <input type="text" name="company" />
                                                        </label>
                                                        <br />

                                                        <label>
                                                            Country / Region *
                                                            <input type="text" name="country" required />
                                                        </label>
                                                        <br />

                                                        <label>
                                                            Street address *
                                                            <input type="text" name="street" required />
                                                            <input type="text" name="street2" required />
                                                        </label>
                                                        <br />

                                                        <label>
                                                            Town / City *
                                                            <input type="text" name="city" required />
                                                        </label>
                                                        <br />

                                                        <label>
                                                            State *
                                                            <input type="text" name="state" required />
                                                        </label>
                                                        <br />

                                                        <br />

                                                        <button type="submit">Save address</button>
                                                    </form>
                                                </div>

                                                : activeTab == 'account' ?
                                                    <div className="billing-address">
                                                        <form>
                                                            <div className="names">
                                                                <label>
                                                                    First name * <br />
                                                                    <input type="text" placeholder="First name *" />
                                                                </label>

                                                                <label>
                                                                    Last name * <br />
                                                                    <input type="text" placeholder="Last name *" />
                                                                </label>


                                                            </div>

                                                            <label>
                                                                Username<br />
                                                                <input type="text" name="username" placeholder="Username *" />
                                                            </label>
                                                            <br />
                                                            <label>
                                                                Email<br />
                                                                <input type="text" name="email" placeholder="Email *" />
                                                            </label>
                                                            <br />

                                                            <div className="password">
                                                                <p>Password change</p>
                                                                <form>
                                                                    <label>
                                                                        Current password (leave blank to leave unchanged)<br />
                                                                        <input type="password" name="email" placeholder="Email *" />
                                                                    </label>
                                                                    <br />
                                                                    <label>
                                                                        New password (leave blank to leave unchanged)<br />
                                                                        <input type="password" name="email" placeholder="Email *" />
                                                                    </label>
                                                                    <br />
                                                                    <label>
                                                                        Confirm new password<br />
                                                                        <input type="password" name="email" placeholder="Email *" />
                                                                    </label>
                                                                    <br />


                                                                </form>

                                                            </div>

                                                            <button type="submit">Save address</button>
                                                        </form>
                                                    </div>


                                                    : <></>

                        }

                    </div>
                </div>
            </div>
            <GreyFooter />
        </div>
    )
}