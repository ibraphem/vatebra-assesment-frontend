const getLocation = () => new Promise((resolve, reject) => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            position => resolve(position),
            error => reject(error),
            { enableHighAccuracy: true }
        );
    } else {
        reject(new Error('Geolocation is not supported by this browser.'))
    }
});

export default getLocation;
