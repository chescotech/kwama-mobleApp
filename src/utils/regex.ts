export const emailRegex = /^[a-zA-Z][a-zA-Z0-9_.]{1,32}@[a-zA-Z0-9_-]{2,}(\.[a-zA-Z0-9]{2,4}){1,2}$/;

export const numberOnlyRegex = /^\d+$/;

export const phoneNumberRegex = /^\d{8,15}$/;

export const nameRegex = /^[a-zA-Z ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;

export const usernameRegex = /^[a-z0-9\\]*$/;