const TEMP_KEY = null

if (!TEMP_KEY) throw new Error("Please enter a api key for pixabay API -- https://pixabay.com/")

const pixabay = {
    baseurl: 'https://pixabay.com/api',
    async getPicture(query) {
        try {
            const pRes = await fetch(`${this.baseurl}/?key=${TEMP_KEY}&q=${query}&image_type=photo`);
            const res = await pRes.json();
            return res;
        } catch (error) {
            return error;
        }
    },
};

module.exports = { pixabay }