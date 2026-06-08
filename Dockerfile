# Use official nginx image
FROM nginx:latest

# Remove default nginx files
RUN rm -rf /usr/share/nginx/html/*

# Copy your website code into nginx folder
COPY . /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
