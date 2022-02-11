

#!/bin/bash


changeExt()
{
	for a in $(ls)
	do
		isPertinent=$(echo $a | grep -i "\.$1$")
		if [ -n "$isPertinent" ]
		then
			filename=$(echo $a | sed -e "s/\.$1//i")
			mv $a $filename.$2
		fi
	done
}


#changeExt $1 $2
