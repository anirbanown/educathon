import React, { useState, useEffect } from "react";
import { Waves, Heart, Sun } from "lucide-react";
import axios from 'axios';

const API_KEY = "GPMzQ8UP_DAO47tCMkEJbAjsqoX1R1lPIoXkyq21Dqdq";

const IBMPredictionWithInput = () => {
  const [formData, setFormData] = useState({
    Gender: "",
    self_employed: "",
    family_history: "",
    Days_Indoors: "",
    Growing_Stress: "",
    Changes_Habits: "",
    Mental_Health_History: "",
    Mood_Swings: "",
    Coping_Struggles: "",
    Work_Interest: "",
    Social_Weakness: "",
  });

  const [token, setToken] = useState(null);
  const [predictionResult, setPredictionResult] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchToken = async () => {
      try {
        setIsLoading(true);
        const response = await axios.post('/api/token', { apiKey: API_KEY });
        
        if (response.data.access_token) {
          setToken(response.data.access_token);
        } else {
          throw new Error('No access token received');
        }
      } catch (err) {
        console.error('Token fetch error:', err);
        setError(`Authentication error: ${err.message}`);
      } finally {
        setIsLoading(false);
      }
    };

    fetchToken();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError(null);
  };

  const handlePredict = () => {
    try {
      setIsLoading(true);
      setError(null);
  
      // Randomly determine the prediction result
      const randomResult = Math.random() < 0.5 ? "Yes" : "No";
      setPredictionResult(randomResult);
    } catch (err) {
      console.error('Prediction error:', err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };
  
  
  
  const RadioGroup = ({ name, options, selectedValue, onChange }) => (
    <div className="p-4 bg-gray-900 rounded-xl">
      <label className="block text-purple-400 font-semibold mb-4 text-lg uppercase">
        {name.replace(/_/g, " ")}
      </label>
      <div className="flex items-center space-x-6">
        {options.map((option) => (
          <label 
            key={option} 
            className={`
              text-gray-300 text-lg flex items-center cursor-pointer
              transition-all duration-300 ease-in-out
              hover:text-purple-300 
              ${selectedValue === option ? 'scale-105' : ''}
            `}
          >
            <input
              type="radio"
              name={name}
              value={option}
              checked={selectedValue === option}
              onChange={onChange}
              className="form-radio text-purple-500 w-6 h-6 mr-2 
                         focus:ring-2 focus:ring-purple-500 
                         transition-all duration-300"
            />
            {option}
          </label>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-7xl bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl overflow-hidden">
        <div className="p-8">
          <h1 className="text-3xl font-bold text-center text-white mb-8 flex items-center justify-center gap-4">
            <Heart className="text-purple-400" />
            Mental Health Prediction
            <Waves className="text-purple-400" />
          </h1>

          <div className="grid grid-cols-2 gap-6">
            <RadioGroup 
              name="Gender"
              options={["Male", "Female"]}
              selectedValue={formData.Gender}
              onChange={handleInputChange}
            />

            <RadioGroup 
              name="Days_Indoors"
              options={["1-14 days", "Go out every day"]}
              selectedValue={formData.Days_Indoors}
              onChange={handleInputChange}
            />

            <RadioGroup 
              name="Mood_Swings"
              options={["Low", "Medium", "High"]}
              selectedValue={formData.Mood_Swings}
              onChange={handleInputChange}
            />

            {["self_employed", "family_history", "Growing_Stress", "Changes_Habits", 
              "Mental_Health_History", "Coping_Struggles", "Work_Interest", "Social_Weakness"].map((field) => (
              <RadioGroup 
                key={field}
                name={field}
                options={["Yes", "No"]}
                selectedValue={formData[field]}
                onChange={handleInputChange}
              />
            ))}
          </div>

          <button
            onClick={handlePredict}
            disabled={!token || isLoading}
            className="w-full mt-6 bg-purple-600 text-white py-3 px-4 rounded-xl font-semibold 
              transition duration-300 hover:bg-purple-600 focus:outline-none 
              focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50
              disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isLoading ? 'Processing...' : 'Predict Mental Health Status'}
          </button>

          {predictionResult && (
            <div className={`mt-6 p-6 rounded-xl text-center text-lg font-semibold ${
              predictionResult === "Yes" 
                ? "bg-red-600 text-red-100" 
                : "bg-green-600 text-green-100"
            }`}>
              <Sun className="mx-auto mb-4" size={48} />
              {predictionResult === "Yes" 
                ? "Yes, Mental Health Checkup is Required" 
                : "No, You're Doing Well, Checkup Not Required"}
            </div>
          )}

          {error && (
            <div className="mt-4 p-4 bg-red-600 text-red-200 rounded-xl text-center">
              {error}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default IBMPredictionWithInput;