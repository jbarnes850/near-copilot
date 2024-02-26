import json

def reformat_chat_data(input_file_path, output_file_path):
    chat_records = []
    current_record = {}
    messages = []

    with open(input_file_path, 'r') as file:
        line_number = 0
        for line in file:
            line_number += 1
            if line.startswith('Chat ID:'):
                if current_record:
                    current_record['Messages'] = messages
                    chat_records.append(current_record)
                    messages = []
                chat_id = line.split('Chat ID: ')[1].strip()
                current_record = {"Chat ID": chat_id}
            elif line.strip().startswith('"role":'):
                try:
                    role_line = line.strip()
                    content_line = next(file).strip()
                    line_number += 1
                    role = role_line.split('"role": ')[1].replace(',', '').strip('"')
                    if '"content":' not in content_line:
                        print(f"Warning: Missing 'content' for 'role' at line {line_number-1}. Skipping this entry.")
                        continue  # Skip this entry
                    content = content_line.split('"content": ')[1].strip('"')
                    messages.append({"role": role, "content": content})
                except ValueError as e:
                    print(f"Error processing file at line {line_number}: {e}")

        if current_record:
            current_record['Messages'] = messages
            chat_records.append(current_record)

    with open(output_file_path, 'w') as json_file:
        json.dump(chat_records, json_file, indent=4)

input_file_path = '/Users/Jarrodbarnes/Chat-history/output.txt'
output_file_path = '/Users/Jarrodbarnes/Chat-history/chat_data.json'
reformat_chat_data(input_file_path, output_file_path)