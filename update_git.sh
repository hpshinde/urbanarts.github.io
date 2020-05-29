#!/bin/sh
while true  
do
	git add . &&
	git commit -m "Add existing file" &&
	git push origin master
	sleep 300
done