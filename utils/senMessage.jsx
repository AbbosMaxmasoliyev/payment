import axios from 'axios';

const TELEGRAM_API_URL = 'https://api.telegram.org';
const BOT_TOKEN = '7335603601:AAH6VI2EhAoTRE-QDVvIIkewFaLcfSMN98Q'; // Telegram bot tokenini kiriting
const CHAT_ID = '-1002166475665'; // Siz yuborishni xohlagan chat ID

// Ma'lumotlarni yuborish funksiyasi
const sendPhotoToBot = async (file, caption) => {
    const formData = new FormData();
    formData.append('chat_id', CHAT_ID);
    formData.append('photo', file);
    formData.append('caption', caption); // Xabar matnini qo'shish

    try {
        const response = await axios.post(
            `${TELEGRAM_API_URL}/bot${BOT_TOKEN}/sendPhoto`,
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
        );
        console.log('Photo sent:', response.data);
    } catch (error) {
        console.error('Error sending photo:', error);
    }
};

// React komponentida ma'lumot yuborish


export default sendPhotoToBot;
