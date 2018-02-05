#!/bin/bash

uglifyjs app/modals/editorModal.js app/controllers/editorController.js -o build/web.min.js -c
uglifycss --output build/main.min.css views/editorStyle.css
cp views/editorView.html build/index.html
echo Building Completed