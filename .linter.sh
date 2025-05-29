#!/bin/bash
cd /home/kavia/workspace/code-generation/jobmatchpro-27323-94fd4c90/jobmatchpro_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

