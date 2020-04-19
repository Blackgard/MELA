export const apiURL = 'https://progress-read.online/api';
export const nextFormatDate   = 'DD.MM.YYYY';
export const serverFormatDate = 'YYYY.MM.DD';

export const headers = () => ({
    headers: {
        'Authorization': "JWT " + localStorage.getItem('token')
    }
})
