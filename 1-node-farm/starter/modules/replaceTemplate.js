module.exports = (temp, product) => {
    let output = temp.replace(/{{product.name}}/g, product.name);
    output = output.replace(/{{product.image}}/g, product.image);
    output = output.replace(/{{product.price}}/g, product.price);
    output = output.replace(/{{product.from}}/g, product.from);
    output = output.replace(/{{product.nutrients}}/g, product.nutrients);
    output = output.replace(/{{product.quantity}}/g, product.quantity);
    output = output.replace(/{{product.description}}/g, product.description);
    output = output.replace(/{{product.unit}}/g, product.unit);
    output = output.replace(/{{product.organic}}/g, !product.organic ? 'not-organic' : '');
    output = output.replace(/{{product.id}}/g, product.id);
    return output;
};
