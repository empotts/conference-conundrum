import csv
import os
import requests

def download_images_from_csv(csv_file, output_folder):
    # Create the output folder if it doesn't exist
    if not os.path.exists(output_folder):
        os.makedirs(output_folder)

    # Open the CSV file and read its contents
    with open(csv_file, 'r', newline='') as file:
        reader = csv.reader(file)
        next(reader)  # Skip the header row if it exists

        for row in reader:
            # Assuming the PNG link is in the first column
            d1 = ["P5","G5"]
            if row[2] in d1:
                png_link = row[1]

                try:
                    # Download the image
                    response = requests.get(png_link)
                    if response.status_code == 200:
                        # Extract the filename from the URL
                        filename = os.path.basename(row[0]+".png")
                        # Save the image to the output folder
                        with open(os.path.join(output_folder, filename), 'wb') as image_file:
                            image_file.write(response.content)
                        print(f"Downloaded: {filename}")
                    else:
                        print(f"Failed to download: {png_link} - Status code: {response.status_code}")
                except Exception as e:
                    print(f"Failed to download: {png_link} - Error: {e}")

if __name__ == "__main__":
    csv_file_path = "logo_ref.csv"  # Path to your CSV file
    output_folder_path = "logos"  # Path to the output folder where images will be saved
    download_images_from_csv(csv_file_path, output_folder_path)
