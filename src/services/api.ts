import axios from 'axios';
import {ApplicationFormData, ApplicationSubmissionResponse} from '../types/application';

const api = axios.create({
    baseURL: '/api',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json'
    }
});

export const submitApplication = async (
    data: ApplicationFormData
): Promise<ApplicationSubmissionResponse> => {
    await new Promise(resolve => setTimeout(resolve, 2000));

    if (!data.personal.email.includes('@')) {
        throw new Error('Invalid email address');
    }

    const referenceNumber = generateReferenceNumber();

    return {
        success: true,
        referenceNumber,
        message: 'Application submitted successfully'
    };
};

const generateReferenceNumber = (): string => {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 10000);
    return `APP-${timestamp}-${random.toString().padStart(4, '0')}`;
};

export async function callZAPI(prompt: string, model = 'glm-4.6') {
    const url = 'https://api.z.ai/api/paas/v4/chat/completions';
    const apiKey = import.meta.env.VITE_OPEN_API_KEY;

    if (!apiKey) {
        throw new Error('API key not configured');
    }

    const messages = [{
        role: 'user',
        content: prompt
    }];

    const {data, status} = await axios.post(
        url,
        {
            model: model,
            messages: messages,
            temperature: 1.0
        },
        {
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
                'Accept-Language': 'en-US,en'
            },
            timeout: 120000,
        },
    );

    if (status >= 400) {
        throw new Error(`API call failed: ${status}`);
    }

    return data.choices[0].message.content.trim();
}


export default api;
