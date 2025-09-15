// Multi-provider AI Service for Ayam Gepuk Artisan
// Supports OpenAI, Anthropic Claude, and Google Gemini

export interface AIProvider {
    name: string;
    apiKey: string;
    baseUrl: string;
    model: string;
    maxTokens: number;
    temperature: number;
}

export interface AIResponse {
    content: string;
    provider: string;
    model: string;
    tokensUsed: number;
    responseTime: number;
    success: boolean;
    error?: string;
}

export interface AIConfig {
    primaryProvider: string;
    fallbackProviders: string[];
    timeout: number;
    retryAttempts: number;
    enableFallback: boolean;
}

class AIService {
    private providers: Map<string, AIProvider> = new Map();
    private config: AIConfig;
    private knowledgeBase: any;

    constructor(knowledgeBase: any) {
        this.knowledgeBase = knowledgeBase;
        this.config = {
            primaryProvider: 'openai',
            fallbackProviders: ['anthropic', 'gemini'],
            timeout: 10000,
            retryAttempts: 2,
            enableFallback: true
        };
    }

    // Initialize AI providers
    initializeProviders() {
        // OpenAI Configuration
        this.providers.set('openai', {
            name: 'OpenAI',
            apiKey: process.env.REACT_APP_OPENAI_API_KEY || '',
            baseUrl: 'https://api.openai.com/v1',
            model: 'gpt-3.5-turbo',
            maxTokens: 1000,
            temperature: 0.7
        });

        // Anthropic Claude Configuration
        this.providers.set('anthropic', {
            name: 'Anthropic Claude',
            apiKey: process.env.REACT_APP_ANTHROPIC_API_KEY || '',
            baseUrl: 'https://api.anthropic.com/v1',
            model: 'claude-3-sonnet-20240229',
            maxTokens: 1000,
            temperature: 0.7
        });

        // Google Gemini Configuration
        this.providers.set('gemini', {
            name: 'Google Gemini',
            apiKey: process.env.REACT_APP_GEMINI_API_KEY || '',
            baseUrl: 'https://generativelanguage.googleapis.com/v1beta',
            model: 'gemini-pro',
            maxTokens: 1000,
            temperature: 0.7
        });
    }

    // Generate system prompt with knowledge base
    private generateSystemPrompt(): string {
        return `You are an AI assistant for Ayam Gepuk Artisan, an authentic Indonesian restaurant in Malaysia. 

RESTAURANT INFORMATION:
- Name: Ayam Gepuk Artisan
- Cuisine: Authentic Indonesian smashed fried chicken
- Locations: Seremban (Main) and Kuala Lumpur
- Phone: +60-18-244-2017
- Hours: Monday-Sunday, 10:00 AM - 10:00 PM
- Services: Dine-in, Takeaway, Delivery
- Halal: Yes, 100% halal certified

MENU HIGHLIGHTS:
- Ayam Gepuk Krispy (RM 15.90) - Spicy and crispy
- Ayam Gepuk Klasik (RM 14.90) - Traditional mild spices  
- Nasi Lemak Special (RM 12.00) - Fragrant coconut rice
- Chicken Wings (RM 15.00) - Spicy marinated wings

PROMOTIONS:
- Weekend Family Feast: 20% off family bundles
- Spicy Monday: 15% off Ayam Gepuk Krispy on Mondays
- Combo Jimat: Any Ayam Gepuk + Drink for RM 15

INSTRUCTIONS:
1. Be friendly, helpful, and enthusiastic about our food
2. Use emojis appropriately (🍗, 🌶️, 😊, etc.)
3. Always mention our halal certification when relevant
4. Provide accurate pricing and information
5. Encourage orders and visits
6. If you don't know something, offer to connect them with our team
7. Keep responses concise but informative
8. Use Malaysian English and local terms when appropriate

RESPONSE FORMAT:
- Use markdown formatting for better readability
- Include relevant emojis
- Provide clear, actionable information
- End with a call-to-action when appropriate`;
    }

    // Call OpenAI API
    private async callOpenAI(prompt: string, provider: AIProvider): Promise<AIResponse> {
        const startTime = Date.now();

        try {
            const response = await fetch(`${provider.baseUrl}/chat/completions`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${provider.apiKey}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    model: provider.model,
                    messages: [
                        { role: 'system', content: this.generateSystemPrompt() },
                        { role: 'user', content: prompt }
                    ],
                    max_tokens: provider.maxTokens,
                    temperature: provider.temperature,
                }),
            });

            if (!response.ok) {
                throw new Error(`OpenAI API error: ${response.status}`);
            }

            const data = await response.json();
            const responseTime = Date.now() - startTime;

            return {
                content: data.choices[0].message.content,
                provider: provider.name,
                model: provider.model,
                tokensUsed: data.usage?.total_tokens || 0,
                responseTime,
                success: true
            };
        } catch (error) {
            return {
                content: '',
                provider: provider.name,
                model: provider.model,
                tokensUsed: 0,
                responseTime: Date.now() - startTime,
                success: false,
                error: error instanceof Error ? error.message : 'Unknown error'
            };
        }
    }

    // Call Anthropic Claude API
    private async callAnthropic(prompt: string, provider: AIProvider): Promise<AIResponse> {
        const startTime = Date.now();

        try {
            const response = await fetch(`${provider.baseUrl}/messages`, {
                method: 'POST',
                headers: {
                    'x-api-key': provider.apiKey,
                    'Content-Type': 'application/json',
                    'anthropic-version': '2023-06-01',
                },
                body: JSON.stringify({
                    model: provider.model,
                    max_tokens: provider.maxTokens,
                    temperature: provider.temperature,
                    messages: [
                        { role: 'user', content: `${this.generateSystemPrompt()}\n\nUser: ${prompt}` }
                    ],
                }),
            });

            if (!response.ok) {
                throw new Error(`Anthropic API error: ${response.status}`);
            }

            const data = await response.json();
            const responseTime = Date.now() - startTime;

            return {
                content: data.content[0].text,
                provider: provider.name,
                model: provider.model,
                tokensUsed: data.usage?.input_tokens + data.usage?.output_tokens || 0,
                responseTime,
                success: true
            };
        } catch (error) {
            return {
                content: '',
                provider: provider.name,
                model: provider.model,
                tokensUsed: 0,
                responseTime: Date.now() - startTime,
                success: false,
                error: error instanceof Error ? error.message : 'Unknown error'
            };
        }
    }

    // Call Google Gemini API
    private async callGemini(prompt: string, provider: AIProvider): Promise<AIResponse> {
        const startTime = Date.now();

        try {
            const response = await fetch(`${provider.baseUrl}/models/${provider.model}:generateContent?key=${provider.apiKey}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    contents: [{
                        parts: [{
                            text: `${this.generateSystemPrompt()}\n\nUser: ${prompt}`
                        }]
                    }],
                    generationConfig: {
                        maxOutputTokens: provider.maxTokens,
                        temperature: provider.temperature,
                    },
                }),
            });

            if (!response.ok) {
                throw new Error(`Gemini API error: ${response.status}`);
            }

            const data = await response.json();
            const responseTime = Date.now() - startTime;

            return {
                content: data.candidates[0].content.parts[0].text,
                provider: provider.name,
                model: provider.model,
                tokensUsed: data.usageMetadata?.totalTokenCount || 0,
                responseTime,
                success: true
            };
        } catch (error) {
            return {
                content: '',
                provider: provider.name,
                model: provider.model,
                tokensUsed: 0,
                responseTime: Date.now() - startTime,
                success: false,
                error: error instanceof Error ? error.message : 'Unknown error'
            };
        }
    }

    // Main AI query method with fallback
    async query(prompt: string): Promise<AIResponse> {
        // First, try to find answer in knowledge base
        const knowledgeBaseAnswer = this.searchKnowledgeBase(prompt);
        if (knowledgeBaseAnswer) {
            return {
                content: knowledgeBaseAnswer,
                provider: 'Knowledge Base',
                model: 'Static',
                tokensUsed: 0,
                responseTime: 0,
                success: true
            };
        }

        // Initialize providers if not done
        if (this.providers.size === 0) {
            this.initializeProviders();
        }

        const providersToTry = [
            this.config.primaryProvider,
            ...this.config.fallbackProviders
        ].filter(providerName => this.providers.has(providerName));

        for (const providerName of providersToTry) {
            const provider = this.providers.get(providerName);
            if (!provider || !provider.apiKey) continue;

            try {
                let response: AIResponse;

                switch (providerName) {
                    case 'openai':
                        response = await this.callOpenAI(prompt, provider);
                        break;
                    case 'anthropic':
                        response = await this.callAnthropic(prompt, provider);
                        break;
                    case 'gemini':
                        response = await this.callGemini(prompt, provider);
                        break;
                    default:
                        continue;
                }

                if (response.success) {
                    return response;
                }
            } catch (error) {
                console.error(`Error with ${providerName}:`, error);
                continue;
            }
        }

        // If all providers fail, return fallback response
        return {
            content: this.getFallbackResponse(prompt),
            provider: 'Fallback',
            model: 'Static',
            tokensUsed: 0,
            responseTime: 0,
            success: true
        };
    }

    // Search knowledge base for answers
    private searchKnowledgeBase(query: string): string | null {
        const searchTerm = query.toLowerCase();

        // Search FAQ
        const faqResults = this.knowledgeBase.faqData.filter((faq: any) =>
            faq.question.toLowerCase().includes(searchTerm) ||
            faq.answer.toLowerCase().includes(searchTerm) ||
            faq.keywords.some((keyword: string) => keyword.toLowerCase().includes(searchTerm))
        );

        if (faqResults.length > 0) {
            const bestMatch = faqResults.sort((a: any, b: any) => b.priority - a.priority)[0];
            return bestMatch.answer;
        }

        // Search menu items
        const menuResults = this.knowledgeBase.menuData.filter((item: any) =>
            item.name.toLowerCase().includes(searchTerm) ||
            item.description.toLowerCase().includes(searchTerm)
        );

        if (menuResults.length > 0) {
            const item = menuResults[0];
            return `🍗 **${item.name}** - RM ${item.price.toFixed(2)}\n\n${item.description}\n\n**Spice Level:** ${item.spiceLevel}/5\n**Preparation Time:** ${item.preparationTime} minutes\n\nWould you like to order this item?`;
        }

        return null;
    }

    // Get fallback response when all AI providers fail
    private getFallbackResponse(query: string): string {
        const searchTerm = query.toLowerCase();

        if (searchTerm.includes('menu') || searchTerm.includes('food')) {
            return `🍗 **Our Menu Highlights:**
      
• **Ayam Gepuk Krispy** - RM 15.90 (Spicy and crispy)
• **Ayam Gepuk Klasik** - RM 14.90 (Traditional mild spices)
• **Nasi Lemak Special** - RM 12.00 (Fragrant coconut rice)
• **Chicken Wings** - RM 15.00 (Spicy marinated wings)

Would you like to see our full menu or place an order?`;
        }

        if (searchTerm.includes('location') || searchTerm.includes('where')) {
            return `📍 **Our Locations:**
      
**Seremban Main Branch:**
123 Jalan Seremban, Seremban, Negeri Sembilan 70000

**KL Branch:**
456 Jalan Ampang, Kuala Lumpur 50450

Both locations offer dine-in, takeaway, and delivery services!`;
        }

        if (searchTerm.includes('hours') || searchTerm.includes('time')) {
            return `🕒 **Opening Hours:**
      
**Monday - Sunday:** 10:00 AM - 10:00 PM

We're open every day! Perfect for lunch, dinner, or late-night cravings.`;
        }

        if (searchTerm.includes('contact') || searchTerm.includes('phone')) {
            return `📞 **Contact Information:**
      
**Phone:** +60-18-244-2017
**Email:** info@ayamgepukartisan.com
**WhatsApp:** [Click here to chat](https://wa.me/60182442017)

We're available for orders, inquiries, and reservations!`;
        }

        return `Hello! I'm your AI assistant for Ayam Gepuk Artisan. I can help you with:

• **Menu information** and recommendations
• **Ordering** and cart management  
• **Location** and contact details
• **Opening hours** and availability
• **Special offers** and promotions
• **General questions** about our restaurant

How can I assist you today? 😊`;
    }

    // Update configuration
    updateConfig(newConfig: Partial<AIConfig>) {
        this.config = { ...this.config, ...newConfig };
    }

    // Add or update provider
    addProvider(name: string, provider: AIProvider) {
        this.providers.set(name, provider);
    }

    // Get provider status
    getProviderStatus(): { [key: string]: boolean } {
        const status: { [key: string]: boolean } = {};

        for (const [name, provider] of this.providers) {
            status[name] = !!provider.apiKey;
        }

        return status;
    }

    // Test provider connection
    async testProvider(providerName: string): Promise<boolean> {
        const provider = this.providers.get(providerName);
        if (!provider || !provider.apiKey) return false;

        try {
            const response = await this.query('Hello, are you working?');
            return response.success;
        } catch (error) {
            return false;
        }
    }
}

// Export singleton instance
export const aiService = new AIService({
    faqData: [],
    menuData: [],
    locationData: [],
    promotionData: []
});

export default AIService;
