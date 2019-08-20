from django.http import HttpResponse, JsonResponse
from django.contrib.postgres.search import SearchVector
from textblob import TextBlob

from api.models import Article


def index(request):
    return HttpResponse("So you've accessed our API, why don't you query a keyword/id(s) to get some actual data?")


def sentiments(request):
    term = request.GET.get('term', '')
    sentiment_list = []
    if term.strip():
        article_set = Article.objects.annotate(search=SearchVector('content'),).filter(search=term)
        if article_set.exists():
            for article in article_set.iterator():
                converted_text = TextBlob(article.content)
                polarity = [0.0]
                subjectivity = [0.0]
                for sentence in converted_text.sentences:
                    if term.lower() in sentence.lower():
                        polarity.append(sentence.sentiment.polarity)
                        subjectivity.append(sentence.sentiment.subjectivity)
                average_polarity = sum(polarity)/len(polarity)
                average_subjectivity = sum(subjectivity)/len(subjectivity)
                sentiment_list.append({'id': article.id,
                                       'pub_date': article.pub_date,
                                       'polarity': average_polarity,
                                       'subjectivity': average_subjectivity})
        else:
            sentiment_list.append("'result': 'error', 'message': 'No article with this term found'")

    return JsonResponse(sentiment_list, safe=False)
