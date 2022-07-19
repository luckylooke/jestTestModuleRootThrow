import somethingElse, { something } from "./dependency.service";

const value1 = somethingElse();
const value2 = something.method();
console.log("ROOT somethingElse", value1);
console.log("ROOT something.method", value2);

// initialisation of module fails
if(value1 === 'throw_error' || value2 === 'throw_error') {
    throw 'Some error';
}

export function smElse() {
    const value = somethingElse();
    console.log("somethingElse", value);
    return value;
}

export function smMethod() {
    const value = something.method();
    console.log("somethingElse", value);
    return value;
}
