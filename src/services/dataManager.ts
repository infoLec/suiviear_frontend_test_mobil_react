import axios from 'axios';
import { Message } from '../types/Message';
import release from '../constants/release';
// import * as packageJson from '../../config/package-solution.json';

const commandRoute = 'commands';
const messageRoute = 'messages';
const mailerRoute = 'mailer';
export default class DataManager {
    private static readonly baseUrl: string = 'https://api.lec.fr';

    public static haveVersion(): Promise<any> {
        return axios.get(DataManager.baseUrl + `/${commandRoute}/version/${release.version}`, {
            headers: {
                'Content-Type': 'application/json',
                Accept: '*/*'
            }
        });
    }

    public static getCommands(userMail: string): Promise<any> {
        return axios.get(DataManager.baseUrl + `/${commandRoute}/${userMail}`, {
            headers: {
                'Content-Type': 'application/json',
                Accept: '*/*'
            }
        });
    }

    public static getMessages(cde: string): Promise<any> {
        return axios.get(DataManager.baseUrl + `/${messageRoute}/${cde}`, {
            headers: {
                'Content-Type': 'application/json',
                Accept: '*/*'
            }
        });
    }

    public static createMessage(message: Message): Promise<any> {
        return axios.post(
            DataManager.baseUrl + `/${messageRoute}`,
            {
                cde: String(message.cde),
                login: message.spAccount,
                message: message.message,
                rep: message.rep,
                pbDelai: message.pbDelai
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    Accept: '*/*'
                }
            }
        );
    }

    public static isReadMessage(cde: string, login: string, isRead?: boolean): Promise<any> {
        return axios.put(
            DataManager.baseUrl + `/${messageRoute}/read`,
            {
                cde: cde,
                login: login,
                isRead: isRead
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    Accept: '*/*'
                }
            }
        );
    }
    public static changeReadStatusForOneMessage(
        cde: string,
        login: string,
        createdAt: Date,
        isRead?: boolean
    ): Promise<any> {
        return axios.put(
            DataManager.baseUrl + `/${messageRoute}/readOne`,
            {
                cde: cde,
                login: login,
                isRead: isRead,
                createdAt: createdAt.toISOString()
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    Accept: '*/*'
                }
            }
        );
    }

    public static getNumberOfUnreadMessages(cde: string, login: string): Promise<any> {
        return axios.get(DataManager.baseUrl + `/${messageRoute}/unread/${cde}/${login}`, {
            headers: {
                'Content-Type': 'application/json',
                Accept: '*/*'
            }
        });
    }

    public static downloadARFile(cde: string): Promise<any> {
        return axios({
            method: 'get',
            url: DataManager.baseUrl + `/${commandRoute}/download/${cde}`,
            responseType: 'blob',
            headers: {
                'Content-Type': 'application/octet-stream'
            }
        });
    }
    public static downloadBLFile(cde: string): Promise<any> {
        return axios({
            method: 'get',
            url: DataManager.baseUrl + `/${commandRoute}/download/bl/${cde}`,
            responseType: 'blob',
            headers: {
                'Content-Type': 'application/octet-stream'
            }
        });
    }

    public static updateDelaiprec(cde: string): Promise<any> {
        return axios.put(
            DataManager.baseUrl + `/${commandRoute}/updateDelaiprec/`,
            {
                cde: cde
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    Accept: '*/*'
                }
            }
        );
    }

    public static isAnMsgGestureLogin(login: string): Promise<any> {
        return axios.get(DataManager.baseUrl + `/messages/isAnMsgGestureLogin/${login}`, {
            headers: {
                'Content-Type': 'application/json',
                Accept: '*/*'
            }
        });
    }

    public static getMailerInfo(cde: string): Promise<any> {
        return axios.get(DataManager.baseUrl + `/${mailerRoute}/info/${cde}`, {
            headers: {
                'Content-Type': 'application/json',
                Accept: '*/*'
            }
        });
    }
    public static getMailerInfoBL(cde: string): Promise<any> {
        return axios.get(DataManager.baseUrl + `/${mailerRoute}/bl/info/${cde}`, {
            headers: {
                'Content-Type': 'application/json',
                Accept: '*/*'
            }
        });
    }

    public static sendMail(
        cde: string,
        to: string,
        cc: string,
        subject: string,
        text: string
    ): Promise<any> {
        return axios.post(
            DataManager.baseUrl + `/${mailerRoute}/`,
            {
                cde: cde,
                cc: cc,
                text: text,
                subject: subject,
                to: to
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    Accept: '*/*'
                }
            }
        );
    }
    public static sendMailBL(
        cde: string,
        to: string,
        cc: string,
        subject: string,
        text: string
    ): Promise<any> {
        return axios.post(
            DataManager.baseUrl + `/${mailerRoute}/bl`,
            {
                cde: cde,
                cc: cc,
                text: text,
                subject: subject,
                to: to
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    Accept: '*/*'
                }
            }
        );
    }

    public static getCdelang = (cde: string): Promise<any> => {
        return axios.get(DataManager.baseUrl + `/${commandRoute}/lang/${cde}`, {
            headers: {
                'Content-Type': 'application/json',
                Accept: '*/*'
            }
        });
    };
}
