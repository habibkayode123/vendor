const numberWithCommas = (x) => {
    // if (!x) return null;
    return "₦" + x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export {numberWithCommas};