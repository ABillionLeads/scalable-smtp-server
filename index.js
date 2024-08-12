console.log('new life - init!');

const Resend = require('resend').Resend;
const resend = new Resend('re_RAW671Ad_5ufcLEz7v9FG6ZbWYEc18Fmu');

(async () => {
    try {
        let domain = await resend.domains.get('91cbe234-a4d5-42bc-b376-9405eafdbf95');
        console.log(domain.data.records);
    } catch (e) {
        console.log('OROARE!');
    }
    // `text` is not available here
})();