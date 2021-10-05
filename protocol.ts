namespace protocol {
    /* Protocol Error Type */
    const SENTRY_PROTOC_OK = 0xE0;
    const SENTRY_PROTOC_FAIL = 0xE1;
    const SENTRY_PROTOC_UNKNOWN = 0xE2;
    const SENTRY_PROTOC_TIMEOUT = 0xE3;
    const SENTRY_PROTOC_CHECK_ERROR = 0xE4;
    const SENTRY_PROTOC_LENGTH_ERROR = 0xE5;
    const SENTRY_PROTOC_UNSUPPORT_COMMAND = 0xE6;
    const SENTRY_PROTOC_UNSUPPORT_REG_ADDRESS = 0xE7;
    const SENTRY_PROTOC_UNSUPPORT_REG_VALUE = 0xE8;
    const SENTRY_PROTOC_READ_ONLY = 0xE9;
    const SENTRY_PROTOC_RESTART_ERROR = 0xEA;
    const SENTRY_PROTOC_RESULT_NOT_END = 0xEC;
/*
    let protocol_buf: number[];

    // %block
    function readBuffer(length: number = 1, timeout: number = 1000): Buffer {
        timeout = control.millis() + timeout;

        do {
            let readbuff = serial.readBuffer(0);
            for (let index = 0; index < readbuff.length; ++index)
                if (readbuff.length) {
                    protocol_buf.push(readbuff.getUint8(index))
                }

            if (timeout <= control.millis()) {
                break;
            }

        } while (protocol_buf.length < length)

        length = length > protocol_buf.length ? protocol_buf.length : length;

        let buf = pins.createBuffer(length)
        if (length > 0) {
            for (let index = 0; index < length; ++index) {
                buf.setUint8(index, protocol_buf.shift())
            }
        }

        return buf;
    }
*/

    function readBuffer(length: number) {
        return serial.readBuffer(length);
    }

    function writeBuffer(buff: Buffer) {
        serial.writeBuffer(buff);
    }
}
