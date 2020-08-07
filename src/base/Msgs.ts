import {Errors} from './Error';
import { Logs } from './Log';
"use strict"

export class Msgs extends Errors {
    EnvLogs() {
        return new Logs()
    }
}