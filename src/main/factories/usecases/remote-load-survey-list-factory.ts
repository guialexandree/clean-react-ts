import { makeApiUrl, makeAxiosHttpClient } from '@/main/factories/http'
import { RemoteLoadSurveyList } from '@/data/usecases'
import { LoadSurveyList } from '@/domain/usecases'

export const makeRemoteLoadSurveyList = (): LoadSurveyList =>
  new RemoteLoadSurveyList(makeApiUrl('/surveys'), makeAxiosHttpClient())
