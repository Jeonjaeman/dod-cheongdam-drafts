#!/usr/bin/env bash
# 사용: make_frames.sh <src.mp4> <name> [count=120] [mobile_focusX=0.5]
# PC: 2400px 폭 16:9 webp q72 / 모바일: 세로 9:16 중앙(혹은 focus) 크롭 1080x1920 q70
set -e
src=$1; name=$2; n=${3:-120}; fx=${4:-0.5}
dir=$(cd "$(dirname "$0")" && pwd)/$name
mkdir -p "$dir/pc" "$dir/m"
dur=$(ffprobe -v error -show_entries format=duration -of csv=p=0 "$src")
fps=$(python -c "print($n/$dur)")
ffmpeg -v error -y -i "$src" -vf "fps=$fps,scale=2400:-2:flags=lanczos" -frames:v $n -c:v libwebp -quality 72 -compression_level 6 "$dir/pc/%03d.webp"
ffmpeg -v error -y -i "$src" -vf "fps=$fps,crop=ih*9/16:ih:(iw-ih*9/16)*$fx:0,scale=1080:1920:flags=lanczos" -frames:v $n -c:v libwebp -quality 70 -compression_level 6 "$dir/m/%03d.webp"
echo "$name pc: $(ls $dir/pc | wc -l) frames $(du -sh $dir/pc | cut -f1) / m: $(ls $dir/m | wc -l) $(du -sh $dir/m | cut -f1)"
