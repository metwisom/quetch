import {request} from "http";
import {Quetch} from "./Quetch.type";
import {QResponse} from "./QResponse.type";

const Quetch: Quetch = function (url: string) {

    const options = {
        hostname: new URL(url).hostname,
        port: new URL(url).port,
        path: new URL(url).pathname,
        method: 'GET',
    };

    let query = new URLSearchParams();

    const header: Record<string, string | number> = {}

    let body = ''

    const QResponse: QResponse = {};
    QResponse.then = async (cb: (res: unknown) => void) => {
        const queryString = query.toString();
        if (queryString) {
            options.path = options.path + '?' + queryString;
        }
        console.log(options.path)
        const req = request(options, (response) => {
            Object.entries(header).map(value => req.setHeader(value[0], value[1]));
            response.on('data', tail => body = body.concat(tail))
            response.on('end', () => {
                cb(JSON.parse(body))
            })
        })
        req.end()
    }

    QResponse.header = (value) => {
        let data;
        if (typeof value == 'function') {
            data = Object.entries(value());
        } else {
            data = Object.entries(value);
        }
        Object.assign(header, data);
        return QResponse;
    }

    QResponse.query = (value) => {
        let data;
        if (typeof value == 'function') {
            data = Object.entries(value());
        } else {
            data = Object.entries(value);
        }
        data.map(value => query.append(value[0], value[1]));
        return QResponse;
    }

    return QResponse;
}

export {Quetch};
