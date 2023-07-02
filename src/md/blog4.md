### 在两份文件中寻找文本内容匹配的答案
有一份topic.txt，这是题目的文件，还有一份answer.txt，这是题目加上答案的文件，但是两者的顺序是打乱的，需要严格匹配题目内容来寻找对应的答案.在chaptgpt的帮助下生成了主体代码，但是始终达不到我要的效果，最后还是自己上手改了一些，才实现了想要的效果。已经不接触python多年，忽然捡起来，感觉语法有点奇葩，比JavaScript还随意,不过确实够灵活。
``` python
import re 
class Answer: 
    def __init__(self, number, content, options, answer): 
        self.number = number 
        self.content = content 
        self.options = options 
        self.answer = answer 
 
class Question: 
    def __init__(self, number, content, options): 
        self.number = number 
        self.content = content 
        self.options  = options 
 
answer_file = "answer.txt" 
topic_file = "topic.txt" 
 
topic_questions = [] 
with open(topic_file, "r", encoding="utf-8") as tf: 
    # 一次性读取所有行的文本 
    topic_lines = tf.readlines() 
    topic_lines = list(filter(lambda x : x != '\n', topic_lines)) 
    for i in range(len(topic_lines)): 
        if "单选" in topic_lines[i]: 
            topic_start = i + 1 
            topic_end = topic_start 
            while topic_end < len(topic_lines) and "单选" not in topic_lines[topic_end]: 
                topic_end += 1 
            if topic_end > topic_start: 
                topic_number = topic_lines[i+1].strip() 
                optionPattern = r"^[ABCD]\." 
                #选项的个数 
                option_count = sum(1 for text in topic_lines[topic_start + 1:topic_end] if re.search(optionPattern, text)) 
                content_text = "".join(topic_lines[topic_start + 1 : topic_end - option_count]).strip() 
                option_text = '' 
                if option_count > 0: 
                    option_text = "".join(topic_lines[topic_end - option_count : topic_end]).strip() 
                question = Question(topic_number, content_text, option_text) 
                topic_questions.append(question) 
            else: 
                print("Error: Invalid topic format at line {}".format(i + 1)) 
 
answer_questions = [] 
 
with open(answer_file, "r", encoding="utf-8") as tf: 
    answer_lines = tf.readlines() 
    # 去除空行 
    answer_lines = list(filter(lambda x: x != '\n', answer_lines)) 
    for i in range(len(answer_lines)): 
        if "单选" in answer_lines[i]: 
            topic_start = i + 1 
            topic_end = topic_start 
            while topic_end < len(answer_lines) and "单选" not in answer_lines[topic_end]: 
                topic_end += 1 
            if topic_end > topic_start: 
                # 这个变量有可能是存的单独的题号，也有可能题号和题目内容是在一行的 
                answer_number_text = answer_lines[i+1].strip() 
                number_pattern = r"^\d+、" 
                # 符合题号正则的数据  
                matches = re.findall(number_pattern, answer_number_text, flags=re.MULTILINE) 
                answer_number = "".join(matches).strip() 
                # 如果not_matches有数据 代表是题号和内容处于同一行 
                not_matches = re.split(number_pattern, answer_number_text, flags=re.MULTILINE)[1:] 
                not_matches = list(filter(lambda x : x != '', not_matches)) 
                content_text = "" 
                is_same_row = False 
                if len(not_matches) != 0: 
                    content_text = "".join(not_matches).strip() 
                    is_same_row = True 
                else: 
                    # 题目内容单独一行的 
                    content_text = answer_lines[i+2].strip() 
                # 匹配选项文本的正则 
                optionPattern = r"^[ABCD]\." 
                option_start_idx = topic_start + 1 if is_same_row else topic_start + 2 
                option_count = sum(1 for text in answer_lines[option_start_idx : topic_end] if re.search(optionPattern, text)) 
                # content_text = "".join(answer_lines[option_start_idx : topic_end - 1 - option_count]).strip() 
                option_text = '' 
                if option_count > 0: 
                    option_text = "".join(answer_lines[topic_end - 1 - option_count: topic_end - 1]).strip() 
                answer = answer_lines[topic_end-1].strip() 
                match = re.search(r'[A-Z]', answer) 
                answerChar = answer[match.start()] if match else answer 
                question = Answer(answer_number, content_text, option_text, answerChar) 
                answer_questions.append(question) 
            else: 
                print("Error: Invalid topic format at line {}".format(i + 1)) 
 
resultList = [] 
for question in topic_questions: 
    hasFind = False 
    count = 0 
    temp_list = [] 
    for answer in answer_questions: 
        if question.content == answer.content: 
            if count > 0: 
                count += 1 
                temp_list.append(answer) 
                # print('当前题目有多个答案，请注意!题号：{}\n答案选项：\n{}'.format(question.number, answer.options)) 
            else:  
                if len(question.options) > 0 and len(answer.options) > 0 and (question.options.strip() == answer.options.strip()): 
                    hasFind = True 
                    resultList.append(answer.answer) 
                    temp_list.append(answer) 
                elif len(question.options) == 0: 
                    # 考试题目没有选项 只匹配题目内容 
                    hasFind = True 
                    count = count + 1 
                    resultList.append(answer.answer) 
                    temp_list.append(answer) 
    if not hasFind: 
        print('这道题目没有找到--题号：{}\n内容：{}\n选项：\n{}'.format(question.number, question.content, question.options)) 
        resultList.append('NOT_FOUND') 
    if count > 1: 
        for obj in temp_list: 
            print('当前题目有多个匹配结果，请注意!题号：{}\n答案选项：\n{}\n答案：{}\n'.format(question.number, obj.options, obj.answer)) 
 
 
for i in range(0, len(resultList), 5): 
    group = resultList[i:i+5] 
    print("题目序号{}--{}答案是{}".format(i+1, i+5," ".join(group))) 
 
# for question in topic_questions: 
#     print('题号：{}\n内容：{}\n选项：\n{}'.format(question.number, question.content, question.options)) 
#     print('分割线-----------------') 
# for question in answer_questions: 
#     print('题号：{}\n内容：{}\n选项：\n{}\n答案：{}'.format(question.number, question.content, question.options, question.answer)) 
#     print('分割线-----------------') 
        
```