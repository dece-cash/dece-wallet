import {config, keys, lang, storage} from "./common";

class Config {

    constructor() {
        this.setting = {
            moneyType: {
                usd: "USD",
                cny: "CNY",
            },
            language: {
                zh_CN: "简体中文",
                en_US: 'English'
            },
            network: {}
        }

        this.host = {
            host: "http://popup.sero.cash/#/",
            // rpc: "http://sero-light-node.ririniannian.com:8545",
            rpc: "http://13.124.240.238:8545",
            price: "",

        }

        this.moneyType = "USD"
        this.language = "en_US"
    }

    init() {
        let moneyType = storage.get(keys.settings.moneyType);
        if (moneyType) {
            this.moneyType = moneyType;
        }

        let language = storage.get(keys.settings.language);
        if (language) {
            this.language = language;
        } else {
            let localUtc = new Date().getTimezoneOffset() / 60;
            if (localUtc === -8) {
                storage.set(keys.settings.language, "zh_CN")
                this.language = "zh_CN";
            } else {
                storage.set(keys.settings.language, "en_US")
                this.language = "en_US"
            }
        }

        let seroRpcHost = storage.get(keys.settings.seroRpcHost);
        if (seroRpcHost) {
            this.host.rpc = seroRpcHost;
        }else{
            this.host.rpc = "http://13.124.240.238:8545"
        }

    }

    isZH =()=>{
        let localUtc = new Date().getTimezoneOffset() / 60;
        return localUtc === -8;
    }

    seroRpc() {
        let v = storage.get(keys.settings.seroRpcHost)
        if (!v) {
            return this.host.rpc;
        } else {
            return v
        }
    }

    seroRpcName() {
        let v = storage.get(keys.settings.seroRpcName)
        if (!v) {
            return lang.e().page.setting.enNode;
        } else {
            return v
        }
    }

    setLanguage(v) {
        storage.set(keys.settings.language, v)
        this.init();
    }

    setRpc(v,name) {
        storage.set(keys.settings.seroRpcHost, v)
        storage.set(keys.settings.seroRpcName, name?name:v)
        this.host.rpc = v
        this.init();
    }

    setMoneyType(v) {
        storage.set(keys.settings.moneyType, v)
        this.init();
    }

}

export default Config