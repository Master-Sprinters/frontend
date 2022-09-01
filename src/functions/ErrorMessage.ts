export const displayErrorMessage = (error:string) => {

    if(error.includes("invalid hex string")){
        return "Geçersiz değer."
    }else if(error.includes("insufficient funds")){
        return "Hesapta geçersiz para."
    }else if(error.includes("resolver or addr is")){
        return "Adres tipinde değil."
    }else if(error.includes("bad address checksum")){
        return "Geçersiz adres."
    }else if(error.includes("undefined")){
        return ""
    }else{
        return error
    }
}

// ÇOCUK EKLE

// -1 falan girince
// invalid hex string

// Hesapta geçersiz para
// insufficient funds for intrinsic transaction cost

// Adres tipinde değil.
// resolver or addr is not configured for ENS name

// Geçersiz adres.
// bad address checksum