import * as _Shamir from "./Shamir"
import * as _Envelope from "./Envelope"
import * as _Protected from "./Protected"
/**
 * Coval Secure Class
 * 
 * @export
 * @class Secure
 */
export class Secure {
    public Shamir = _Shamir.Shamir
    public Protected = _Protected.Protected
}
/**
 * Coval Transport Class
 * 
 * @export
 * @class Transport
 */
export class Transport {
    public Envelope = _Envelope.Envelope
}
