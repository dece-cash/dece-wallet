import React, {Component} from 'react'
import {NavBar, Modal, Icon, WingBlank, WhiteSpace, List, Toast, InputItem, Button} from 'antd-mobile'
import {config, url, lang} from "../../../config/common";
import {assetService} from "../../../components/service/service";

class Settings extends Component {

    constructor(props) {
        super(props);
        this.state = {
            network: [],
            showNetwork: false,
        }
    }

    componentDidMount() {
        config.init();

        this.setState({
            network: [
                {
                    id: "1",
                    network: "main",
                    name: "MAIN NETWORK",
                    rpc: "https://node-prod.dece.cash",
                },{
                    id: "2",
                    network: "test",
                    name: "TEST NETWORK",
                    rpc: "https node.dece.cash",
                }
            ]
        })
    }


    clearData = () => {
        try {
            Toast.loading("Clearing...")
            assetService.clearData("").then(res => {
                Toast.success(lang.e().toast.success.clear, 2)
                setTimeout(function () {
                    Modal.alert(lang.e().modal.clearData, lang.e().modal.clearTip, [{
                        text: lang.e().button.confirm, onPress: () => {
                            window.location.href = "./index.html#/"
                        },
                    }])
                }, 2000)
            }).catch(err => {
                Toast.success(lang.e().toast.error.clearData, 3)
                console.log(err)
            })
        } catch (e) {
            Toast.success(lang.e().toast.error.clearData, 3)
            console.log("clear Data:", e.message)
        }
    }

    setRpc(rpc, name) {
        if (rpc) {
            config.setRpc(rpc, name)
            assetService.init()
        }
        this.setState({
            showNetwork: false
        })
    }

    actionSheet(data) {
        let op = [];
        data.forEach(value => {
            op.push({
                text: value.url,
                onPress: () => {
                    window.location.href = value.url + "#/";
                }
            })
        })
        Modal.operation(op)
    }

    render() {
        let that = this;
        let {network} = this.state;

        return <div style={{height: document.documentElement.clientHeight - 45}}>
            <div className="layout-top">
                <NavBar
                    mode="dark"
                    style={{background: "#294486"}}
                    leftContent={<Icon type="left"/>}
                    onLeftClick={() => {
                        url.goBack()
                    }}
                >
                    {lang.e().page.my.settings}
                </NavBar>

            </div>
            <div style={{marginTop: "45px"}}>
                <WingBlank>
                    <WhiteSpace size="lg"/>
                    <List>
                        <List.Item extra={
                            <span style={{fontSize: "14px"}}>{lang.e().value}</span>
                        } arrow="horizontal"
                                   onClick={() => {
                                       Modal.operation([
                                           {
                                               text: lang.en_US.value, onPress: () => {
                                                   config.setLanguage(lang.en_US.key);
                                                   url.goPage(url.Settings + "?" + new Date());
                                               }
                                           },
                                           {
                                               text: lang.zh_CN.value, onPress: () => {
                                                   config.setLanguage(lang.zh_CN.key);
                                                   url.goPage(url.Settings + "?" + new Date());
                                               }
                                           },
                                           {
                                               text: lang.ja_JP.value, onPress: () => {
                                                   config.setLanguage(lang.ja_JP.key);
                                                   url.goPage(url.Settings + "?" + new Date());
                                               }
                                           },
                                           {
                                               text: lang.be_BY.value, onPress: () => {
                                                   config.setLanguage(lang.be_BY.key);
                                                   url.goPage(url.Settings + "?" + new Date());
                                               }
                                           },
                                           {
                                               text: lang.ko_KR.value, onPress: () => {
                                                   config.setLanguage(lang.ko_KR.key);
                                                   url.goPage(url.Settings + "?" + new Date());
                                               }
                                           }
                                       ])
                                   }}
                        ><span >{lang.e().page.setting.language}</span></List.Item>
                    </List>
                    <WhiteSpace/>
                    <List>
                        <List.Item extra={
                            <span style={{fontSize: "14px"}}>{config.seroRpcName()}</span>
                        } arrow="horizontal" onClick={() => {
                            this.setState({
                                showNetwork: true
                            })
                        }}><span >{lang.e().page.setting.node}</span></List.Item>


                    </List>
                    <WhiteSpace/>
                    <List>
                        <List.Item arrow="horizontal" onClick={() => {
                            url.goPage(url.HistoryPKr, url.Settings)
                        }}><span >{lang.e().page.setting.pkr}</span></List.Item>


                    </List>
                    <WhiteSpace/>
                    <List>
                        <List.Item onClick={() => {
                            Modal.alert(lang.e().modal.clearData, lang.e().modal.confirmClear, [{
                                text: lang.e().button.cancel, onPress: () => {
                                }
                            }, {
                                text: lang.e().button.confirm, onPress: () => {
                                    this.clearData()
                                },
                            }])
                        }}>
                            <div style={{color: "red", textAlign: "center"}}>{lang.e().page.my.clear}</div>
                        </List.Item>
                    </List>
                </WingBlank>

                <Modal
                    popup
                    visible={this.state.showNetwork}
                    onClose={() => {
                        this.setState({
                            showNetwork: false
                        })
                    }}
                    animationType="slide-up"
                >
                    <WingBlank>
                        <List renderHeader={() => <div>{lang.e().page.setting.node}</div>} className="popup-list">
                            {network.map((v, index) => (

                                <div>
                                    <List.Item key={index} onClick={() => {
                                        this.setRpc(v.rpc, v.name);
                                    }}>{v.name}</List.Item>
                                    <WhiteSpace/>
                                </div>
                            ))}
                            <List.Item>
                                <InputItem placeholder={"http://"} id="customer"/>
                            </List.Item>
                            <WhiteSpace/>
                        </List>
                        <div style={{margin: "15px 0"}}>
                            <Button type="primary" onClick={() => {
                                let customer = document.getElementById("customer").value;
                                this.setRpc(customer);
                            }}><span style={{color: "#fff"}}>{lang.e().button.confirm}</span></Button>
                        </div>
                    </WingBlank>
                </Modal>
            </div>
        </div>
    }
}


export default Settings