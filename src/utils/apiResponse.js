/**
 * @typedef {string} MessageContent
 */

/**
 * @typedef {Object} ApiResponse
 * @property {boolean} success - This property indicates whether the API request was successful or not
 * @property {MessageContent} message - This property represents the message content which can be in different languages
 * @property {*} [data] - This property represents the data returned from the API request, if any
 */

/**
 * This function creates a success response object
 * @param {*} data - This parameter represents the data to be included in the response
 * @param {MessageContent} message - This parameter represents the message content
 * @returns {ApiResponse} This function returns a success response object
 */
const successResponse = (data, message) => ({
  success: true,
  message,
  data,
});

/**
 * This function creates an error response object
 * @param {MessageContent} message - This parameter represents the error message content
 * @returns {ApiResponse} This function returns an error response object
 */
const errorResponse = (message) => ({
  success: false,
  message,
});

module.exports = {
  successResponse,
  errorResponse,
};
