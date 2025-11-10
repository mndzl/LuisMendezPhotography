from rest_framework.response import Response
from rest_framework.decorators import api_view
from base.models import Session, Category
from .serializers import SessionSerializer, CategorySerializer


@api_view(['GET'])
def getSessions(request):
    sessions = Session.objects.all()
    serialized_sessions = SessionSerializer(sessions, many=True)

    return Response(serialized_sessions.data)
