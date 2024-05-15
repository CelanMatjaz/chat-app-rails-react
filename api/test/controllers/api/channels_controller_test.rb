require "test_helper"

class Api::ChannelsControllerTest < ActionDispatch::IntegrationTest
  test "should get create" do
    get api_channels_create_url
    assert_response :success
  end

  test "should get get_all" do
    get api_channels_get_all_url
    assert_response :success
  end

  test "should get get_single" do
    get api_channels_get_single_url
    assert_response :success
  end

  test "should get delete" do
    get api_channels_delete_url
    assert_response :success
  end

  test "should get update" do
    get api_channels_update_url
    assert_response :success
  end
end
