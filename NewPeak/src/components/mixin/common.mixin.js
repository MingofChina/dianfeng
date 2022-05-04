export default {
    methods: {
        setBackgroundImage(url) {
<<<<<<< HEAD
            let bashUrl = 'http://ceshi.davost.com';
            return {
                background: "url(" + bashUrl + url + ")"
=======
            let bashUrl =  'http://ceshi.davost.com';
            return {
                background: "url("+bashUrl + url + ")"
>>>>>>> d4bad22cde97dcfeffab6bd2ff20c4f08c4fc9f0
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