import somethingElse, { something } from "./dependency.service";

const value = somethingElse();
console.log("ROOT somethingElse", value);
// initialisation of module fails
if(value === 'throw_error') {
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
