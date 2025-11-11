from rest_framework.response import Response
from rest_framework.decorators import api_view
from base.models import Session
from .serializers import SessionSerializer
from rest_framework import generics


@api_view(['GET'])
def getSessions(request):
    sessions = Session.objects.all()
    serialized_sessions = SessionSerializer(sessions, many=True)

    return Response(serialized_sessions.data)


class SessionsListCreate(generics.ListCreateAPIView):
    queryset = Session.objects.all()
    serializer_class = SessionSerializer
