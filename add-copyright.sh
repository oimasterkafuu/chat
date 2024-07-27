#!/bin/bash

# 要添加版权提示的文件扩展名列表
EXTENSIONS=("js" "html" "css")

# 版权声明文本
COPYRIGHT_TEXT="Chat - A simple chat application.
Copyright (C) 2024 oimaster

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program. If not, see <https://www.gnu.org/licenses/>.

Contact Information:
Email: oimasterfake@icloud.com

Project URL: https://github.com/oimasterkafuu/chat"

# 注释模板
COMMENT_JS="/*\n$COPYRIGHT_TEXT\n*/\n"
COMMENT_HTML="<!--\n$COPYRIGHT_TEXT\n-->\n"
COMMENT_CSS="/*\n$COPYRIGHT_TEXT\n*/\n"

# 遍历所有指定扩展名的文件，忽略node_modules目录
for EXT in "${EXTENSIONS[@]}"; do
    find . -type f -name "*.$EXT" ! -path "./node_modules/*" ! -path "./coverage/*" | while read FILE; do
        # 选择适当的注释模板
        case "$EXT" in
            js) COPYRIGHT_NOTICE="$COMMENT_JS" ;;
            html) COPYRIGHT_NOTICE="$COMMENT_HTML" ;;
            css) COPYRIGHT_NOTICE="$COMMENT_CSS" ;;
        esac

        # 检查文件是否已经包含版权提示
        if grep -q "Copyright (C) 2024 oimaster" "$FILE"; then
            echo "Copyright notice already exists in $FILE"
        else
            # 临时文件
            TEMP_FILE=$(mktemp)

            # 将版权提示和原文件内容合并到临时文件
            echo -e "$COPYRIGHT_NOTICE" | cat - "$FILE" > "$TEMP_FILE"

            # 将临时文件内容覆盖到原文件
            mv "$TEMP_FILE" "$FILE"

            echo "Added copyright notice to $FILE"
        fi
    done
done
