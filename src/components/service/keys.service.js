import axios from "axios";

const URL = 'https://hamsterkeys-dgceb9e3ckfncrdz.francecentral-01.azurewebsites.net/keys'

class KeysService {
    getKeys() {
        return axios.get(URL);
    }
}

export default new KeysService();