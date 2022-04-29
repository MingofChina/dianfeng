export default {
    methods: {
        setBackgroundImage(url) {
            return {
                background: "url(" + url + ")"
            };
        },
    },
    filters: {
        transformImageUrl(url) {
            if (!url || url.includes('http://') || url.includes('https://')){
                return;
            }
            let bashUrl =  'http://ceshi.davost.com';
            bashUrl = bashUrl + (url.indexOf('/') === 0 ? '' : '/');
            return bashUrl + url;
        }
    }
}