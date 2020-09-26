import React, {Component} from 'react'
import {Icon, List, NavBar, WingBlank} from "antd-mobile";
import {lang, url,config} from "../../../config/common";
import sero from "../../../logo.png";
import './about.css'
import WhiteSpace from "antd-mobile/es/white-space";

const urls = [
    {
        name: "Website",
        value: "",
        url: ""
    }, {
        name: "GitHub",
        value: "",
        url: ""
    }, {
        name: "Twitter",
        value: "",
        url: ""
    }
    ]

class AboutUs extends Component {

    constructor(props) {
        super(props);

        this.state = {
            version:"1.0.1"
        }
    }

    componentDidMount() {
        const that = this;
        if(plus && plus.runtime){
            plus.runtime.getProperty(plus.runtime.appid,function(inf){
                that.setState({
                    version:inf.version
                })
            });
        }
    }

    getReq(url,cb){
        const xhr = new plus.net.XMLHttpRequest();
        xhr.onreadystatechange = function () {
            switch ( xhr.readyState ) {
                case 0:
                case 1:
                case 2:
                case 3:
                    break;
                case 4:
                    if ( xhr.status === 200 ) {
                        cb(xhr.responseText,null);
                    } else {
                        cb(null,xhr.readyState);
                    }
                    break;
                default :
                    break;
            }
        }
        xhr.open( "GET", url);
        xhr.send();
    }


    render() {

        let abouts = [];
        let i = 0;
        urls.forEach(function (o) {
            abouts.push(
                <div>
                    <WhiteSpace/>
                    <List.Item key={i++} arrow="horizontal" extra={<span style={{color: "#0066cc", flexBasis: "60%"}} onClick={() => {
                        if (o.url) {
                            url.goPage(url.browser(o.url))
                        }
                    }}>{o.value}</span>}>{o.name}</List.Item>
                </div>
            )
        })

        return (
            <div>
                <NavBar
                    mode="dark"
                    style={{background: "#294486"}}
                    leftContent={<Icon type="left" onClick={() => {
                        url.goBack()
                    }}/>}
                >
                    {lang.e().page.my.about}
                </NavBar>
                <div>
                    <div className="my-header">
                        <img src="./img/black.png" style={{width:"100%"}}/>
                    </div>
                    <WingBlank>
                        <WhiteSpace size="lg"/>
                    <List>
                        {abouts}
                        <div>
                            <List.Item key={i++} arrow="horizontal" extra={<span>{this.state.version}</span>}>Version</List.Item>
                        </div>
                    </List>
                    </WingBlank>
                </div>
            </div>
        )
    }
}

export default AboutUs