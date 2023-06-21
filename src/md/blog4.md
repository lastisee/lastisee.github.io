### 在两份文件中寻找文本内容匹配的答案
有一份topic.txt，这是题目的文件，还有一份answer.txt，这是题目加上答案的文件，但是两者的顺序是打乱的，需要严格匹配题目内容来寻找对应的答案.在chaptgpt的帮助下生成了主体代码，但是始终达不到我要的效果，最后还是自己上手改了一些，才实现了想要的效果。已经不接触python多年，忽然捡起来，感觉语法有点奇葩，比JavaScript还随意,不过确实够灵活。
``` python
import re
class Answer:
    def __init__(self, number, content, answer):
        self.number = number
        self.content = content
        self.answer = answer

class Question:
    def __init__(self, number, content):
        self.number = number
        self.content = content

answer_file = "answer.txt"
topic_file = "topic.txt"

topic_questions = []
with open(topic_file, "r", encoding="utf-8") as tf:
    topic_lines = tf.readlines()
    for i in range(len(topic_lines)):
        if "单选" in topic_lines[i]:
            topic_start = i + 1
            topic_end = topic_start
            while topic_end < len(topic_lines) and "单选" not in topic_lines[topic_end]:
                topic_end += 1
            if topic_end > topic_start:
                topic_text = "".join(topic_lines[topic_start + 1:topic_end]).strip()
                question = Question(topic_lines[i+1].strip(), topic_text)
                topic_questions.append(question)
            else:
                print("Error: Invalid topic format at line {}".format(i + 1))

answer_questions = []

with open(answer_file, "r", encoding="utf-8") as tf:
    answer_lines = tf.readlines()
    for i in range(len(answer_lines)):
        if "单选" in answer_lines[i]:
            topic_start = i + 1
            topic_end = topic_start
            while topic_end < len(answer_lines) and "单选" not in answer_lines[topic_end]:
                topic_end += 1
            if topic_end > topic_start:
                topic_text = "".join(answer_lines[topic_start + 1:topic_end - 1]).strip()
                answer = answer_lines[topic_end-1].strip()
                match = re.search(r'[A-Z]', answer)
                answerChar = answer[match.start()] if match else answer
                question = Answer(answer_lines[i+1].strip(), topic_text, answerChar)
                answer_questions.append(question)
            else:
                print("Error: Invalid topic format at line {}".format(i + 1))

resultList = []
for question in topic_questions:
    hasFind = False
    count = 0
    for answer in answer_questions:
        if question.content == answer.content:
            if count == 1:
                print('当前题目有多个答案，请注意！！！！！！！！！！！{}'.format(question.number))
                break
            hasFind = True
            count = count + 1
            resultList.append(answer.answer)
    if not hasFind:
        print("这道题目没有找到：{}".format(question.content))

for i in range(0, len(resultList), 5):
    group = resultList[i:i+5]
    print("题目序号{}--{}答案是{}".format(i+1, i+5," ".join(group)))
        
```