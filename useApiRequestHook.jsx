const { useCallback, useState, useMemo } = require("react");

/**
 * @param {String | Date} date
 * @returns {String | null}
 */

const formattedDateToDisplay = (date) => {
  return date
    ? new Date(date)?.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "2-digit",
      })
    : null;
};

/**
 *
 * @param {String | Date} date
 * @returns {String | null}
 */

const formattedDateForApi = (date) => {
  return date ? new Date(date)?.toISOString() : null;
};

/**
 *
 * @param {String} authToken
 * @param {String} baseUrl
 * @returns {Object} - {request, loading, setLoading}
 *
 * @example
 * const { request, loading } = useApiRquest('auth-token', 'https://api.example.com');
 *
 * //get request
 * await request({
 * endpoint: '/data',
 * onSuccess: (data)=> setData(data)
 * });
 *
 * //POST request
 * await request({
 * method: 'POST',
 * endpoint: '/data',
 * payload: {key: 'value'},
 * onSuccess: (data)=> setData(data)
 * onError: (error) => console.error(error)
 * });
 */

const useApiRquest = (authToken, baseUrl) => {
  const [loading, setLoading] = useState(false);
  const request = useCallback(
    async (config) => {
      const {
        method = "GET",
        endpoint,
        payload,
        onSuccess,
        onError,
        showWarning = true,
      } = config;
      try {
        setLoading(true);
        const axiosConfig = {
          method,
          url: `${baseUrl}${endpoint}`,
          headers: { Authorization: authToken },
          ...(payload && { data: payload }),
        };

        const response = await axios(axiosConfig);
        const data = response.data;

        if (showWarning && data?.resultStatus === "3") {
          Notification.warning({ message: data?.resultText });
        }

        onSuccess?.(data);
        return data;
      } catch (error) {
        console.error(error);
        onError?.(error);
        return null;
      } finally {
        setLoading(false);
      }
    },
    [authToken, baseUrl]
  );
  return { request, loading, setLoading };
};

//To use the useApiRequest hook
const { request, loading } = useApiRquest(
  "auth-token",
  "https://api.example.com"
);

const fetchRequest = () => {
  request({
    method: "POST",
    endpoint: "/data",
    payload: { key: "value" },
    onSuccess: (data) => {
      console.log("Success:", data);
    },
    onError: (error) => {
      console.error("Error:", error);
    },
  });
};

// *** CONSTANTS & CONFIGURATIONS **
const ISPECTION_TYPES = {
  ROUTINE: ["scheduled routine inspections", "schedule-routine inspections"],
  CAMPAIGN: ["campaign inspection"],
  JOINT: ["joint inspection"],
  PATROLLING: ["patrolling", "noc patrolling"],
  WITNESS_AUDIT: ["witness audit"],
};

// Generic Inspection Type matcher
const matchesInspectionType = (inspectionName, patterns) => {
  const lowerName = inspectionName?.toLowerCase() || "";
  return patterns.some((pattern) => lowerName === pattern);
};

// This creates type checker function dynamically
export const createTypeChecker = (patterns) => (inspectionName) =>
  matchesInspectionType(inspectionName, patterns);

//alternative version of above code
const createTypeCheckerAlt = (patterns) => {
  return function (inspectionName) {
    return matchesInspectionType(inspectionName, patterns);
  };
};

// ✅ Higher-order function (function that returns a function)
// ✅ Closure (inner function remembers patterns)
// ✅ Function factory (creates specialized functions)

// pre-built type checker for common inspection type
const isRoutineInspectionType = createTypeChecker(ISPECTION_TYPES.ROUTINE);
const isCampaignInspectionType = createTypeChecker(ISPECTION_TYPES.CAMPAIGN);

/**
 * @param {String} selectedInspectionType
 * @returns {Object}
 *
 * @example
 *
 * const typeState = useInspectionTypeState('Campaign Inspection')
 *
 * if(typeState.isCampaign){
 * //handle the logic for campaign inspection}
 */

const useInspectionTypeState = (selectedInspectionType) => {
  return useMemo(() => {
    isRoutine: isRoutineInspectionType(selectedInspectionType);
    isCampaign: isCampaignInspectionType(selectedInspectionType);
  }, [selectedInspectionType]);
};

/**
 *
 * @param {Object} params - parameters for visibility calculation
 * @param {Number | null} params.orgId - Selected Organization ID
 * @param {Object} params.orgProcess - Organization process configuration
 * @param {String | null} params.selectedInspectionType - selected inspection type name
 * @param {Object | null} params.inspectionEntityData - inspection entity data
 * @returns {Object} - Object containing visibility flags & process flags
 *
 * @example
 * const visibility = useFieldVisibility({
 *  orgId: 123,
 *  orgProcess: OrgProcessConfig,
 *  selectedInspectionType: 'Routine Inspection',
 *  inspectionEntityData: InspectionData
 * });
 *
 * {visibility.caseInfoFields && <CaseInfoForm />}
 * {visibility.activityGroupFields && <ActivityGroupForm />}
 */

export const useFieldVisibility = ({
  orgId,
  orgProcess,
  selectedInspectionType,
  inspectionEntityData,
}) => {
  const typeState = useInspectionTypeState(selectedInspectionType);
  const isCaseEnabled = isCaseEnabled(orgProcess);
  const isActivityEnabled = isActivityEnabled(orgProcess);

  return useMemo(
    () => ({
      caseInfoFields:
        !typeState.isRoutine &&
        orgId &&
        isCaseEnabled &&
        selectedInspectionType &&
        !typeState.isPatrolling,

      activityGroupFields: orgId && isActivityEnabled,
      establishmentTypeField: !isCaseEnabled && !isActivityEnabled && orgId,
      isActivityEnabled,
      isCaseEnabled,

      ...typeState,
    }),
    [
      orgId,
      orgProcess,
      typeState,
      inspectionEntityData,
      selectedInspectionType,
      isCaseEnabled,
      isActivityEnabled,
    ]
  );
};
