#!/bin/bash

chown -R node:node /frontend

exec npm run dev
