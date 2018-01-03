import {Errors} from './Error';
import { Logs } from './Log';
"use strict"

export class Msgs extends Errors {
    Logs = function() {
        return new Logs()
    }
}