
import React, { useState } from 'react';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [emailSent, setEmailSent] = useState(false);
    const [error, setError] = useState('');

    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Réinitialiser les états
        setError('');

        // Validation de l'email
        if (!validateEmail(email)) {
            setError('Veuillez saisir une adresse email valide');
            return;
        }

        setIsSubmitting(true);

        try {

            await new Promise(resolve => setTimeout(resolve, 1000));
            setEmailSent(true);

        } catch (err) {
            setError('Erreur lors de l\'envoi de l\'email de réinitialisation. Veuillez réessayer.');
            console.error('Erreur de réinitialisation:', err);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
            <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
                    Mot de passe oublié
                </h2>

                {emailSent ? (
                    <div className="text-center">
                        <div className="mb-4 flex justify-center">
                            <div className="rounded-full bg-green-100 p-2">
                                <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                </svg>
                            </div>
                        </div>
                        <h3 className="text-lg font-medium text-gray-900">Email envoyé</h3>
                        <p className="mt-2 text-gray-600">
                            Si un compte existe avec l'adresse {email}, vous recevrez un email contenant un lien pour réinitialiser votre mot de passe.
                        </p>
                        <button
                            onClick={() => setEmailSent(false)}
                            className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded transition duration-200"
                        >
                            Retour
                        </button>
                    </div>
                ) : (
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                Adresse email
                            </label>
                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Entrez votre adresse email"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                            {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
                        </div>

                        <div className="pt-2">
                            <button
                                onClick={handleSubmit}
                                disabled={isSubmitting}
                                className={`w-full py-2 px-4 rounded-md font-medium text-white ${
                                    isSubmitting ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
                                } transition duration-200`}
                            >
                                {isSubmitting ? 'Envoi en cours...' : 'Envoyer le lien de réinitialisation'}
                            </button>
                        </div>

                        <div className="text-center mt-4">
                            <a href="#" className="text-sm text-blue-600 hover:text-blue-800">
                                Retour à la connexion
                            </a>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ForgotPassword;