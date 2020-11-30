import React, {Component} from 'react'
import {NavBar, TabBar, Icon} from 'antd-mobile'
import './layout.css'
import {storage, keys, config, url, baseDecimal, lang} from "../../config/common";
import {shares,dapp,dece,dkrw,finple,HAPY,person,sero,sharesB,dappB,personB} from '../../icons/index';

// const showDataVersion = ['1.0','1.1.4']

class Layout extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showDApp:false
        }
    }

    componentDidMount() {
        if (window.frames.length !== parent.frames.length){
            this.setState({
                showDApp:false
            })
        }else{
            this.setState({
                showDApp:true
            })
        }
        // const that = this;
        // if(plus && plus.runtime){
        //     const version = plus.runtime.version;
        //     showDataVersion.forEach((v)=>{
        //         if(version === v){
        //             that.setState({
        //                 showDApp:true,
        //             })
        //         }
        //     })
        // }else{
        //     that.setState({
        //         showDApp:true,
        //     })
        // }
    }

    render() {
        const { showDApp } = this.state;

        return <div>

            {this.props.children}

            <div className="tabbar">
                <TabBar barIntColor="#294486" tintColor="#fff" noRenderContent={true}>
                    <TabBar.Item
                        icon={<Icon type="iconzhanghuzichan" style={{color:"#fff"}} className="bar-icon"/>}
                        selectedIcon={<Icon type="iconzhanghuzichan"  style={{color:"#1296db"}}  className="bar-icon"/>}
                        title={<span className="bar-text">{lang.e().navbar.wallet}</span>}
                        key="home"
                        selected={this.props.selectedTab === 'home'}
                        onPress={()=>{
                            url.goPage(url.Home,"")
                        }}
                    >
                    </TabBar.Item>
                    {
                        showDApp===true?<TabBar.Item
                                icon={<img src={dappB} className="bar-icon"/>}
                                selectedIcon={<img src={dapp} className="bar-icon"/>}
                                title={<span className="bar-text">{lang.e().navbar.dapp}</span>}
                                key="dapp"
                                selected={this.props.selectedTab === 'dapp'}
                                onPress={()=>{
                                    url.goPage(url.DApp,"")
                                }}
                            > </TabBar.Item>:""

                    }
                    <TabBar.Item
                        icon={<img src={personB} className="bar-icon"/>}
                        selectedIcon={<img src={person} className="bar-icon"/>}
                        title={<span className="bar-text">{lang.e().navbar.my}</span>}
                        key="my"
                        selected={this.props.selectedTab === 'my'}
                        onPress={()=>{
                            url.goPage(url.Personal,"")
                        }}
                    >
                    </TabBar.Item>
                </TabBar>
            </div>

        </div>
    }
}

export default Layout