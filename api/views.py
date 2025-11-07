from rest_framework.response import Response
from rest_framework.decorators import api_view
from base.models import Session
from .serializers import SessionSerializer


@api_view(['GET'])
def getSessions(request):
    sessions = Session.objects.all()
    serializer = SessionSerializer(sessions, many=True)

    return Response(serializer.data)
