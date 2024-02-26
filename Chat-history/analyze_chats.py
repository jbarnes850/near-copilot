import pandas as pd
import nltk
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
from nltk.stem import WordNetLemmatizer
from nltk.text import Text
import plotly.express as px
import json

# Ensure NLTK resources are downloaded
nltk.download('punkt')
nltk.download('stopwords')
nltk.download('wordnet')

def preprocess_text(text):
    """Preprocess text by tokenizing, removing stopwords, and lemmatizing."""
    tokens = word_tokenize(text.lower())
    filtered_tokens = [word for word in tokens if word not in stopwords.words('english') and word.isalpha()]
    lemmatizer = WordNetLemmatizer()
    lemmatized_tokens = [lemmatizer.lemmatize(word) for word in filtered_tokens]
    return lemmatized_tokens

def extract_user_queries(chat_data):
    """Extract user queries from chat data."""
    user_queries = []
    for chat in chat_data:
        for message in chat['Messages']:
            if message['role'] == 'user':
                user_queries.append(message['content'])
    return user_queries

def generate_dashboard(user_queries):
    """Generate a dashboard showing the frequency of top user queries."""
    # Count the frequency of each unique query
    query_freq = pd.Series(user_queries).value_counts().reset_index()
    query_freq.columns = ['Query', 'Frequency']
    
    # Select the top N queries for visualization
    top_queries = query_freq.head(20)
    
    # Generate a bar chart using Plotly Express
    fig = px.bar(top_queries, x='Query', y='Frequency', title='Top User Queries')
    fig.show()

def main():
    # Load chat data from file
    try:
        # Update the file path to the correct location
        with open('/Users/Jarrodbarnes/Chat-history/chat_data.json', 'r') as file:
            chat_data = json.load(file)
    except json.JSONDecodeError as e:
        print(f"Error decoding JSON: {e}")
        return  # Exit the function or handle the error as needed
    except FileNotFoundError:
        print("File not found. Please check the file path.")
        return  # Exit the function or handle the error as needed

    if not chat_data:
        print("No data found in the file.")
        return  # Exit the function or handle the error as needed
    
    # Extract user queries from the loaded chat data.
    user_queries = extract_user_queries(chat_data)
    
    # Generate a dashboard to analyze themes from the chat history.
    generate_dashboard(user_queries)

if __name__ == "__main__":
    main()
